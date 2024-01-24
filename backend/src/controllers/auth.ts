import { Request, RequestHandler, Response } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import createHttpError from 'http-errors';
import EmailVerificationToken from '../models/EmailVerificationToken';
import sendMail from '../util/mailer';
import { isValidObjectId } from 'mongoose';
import { generateVerificationCode } from '../util/helper';
import PasswordResetToken from '../models/PasswordResetToken';
import env from '../util/validateEnv';

interface SignUpBody {
    username?: string;
    email?: string;
    password?: string;
}

export const signUp: RequestHandler<
    unknown,
    unknown,
    SignUpBody,
    unknown
> = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const existingUsername = await User.findOne({
            username: username,
        }).exec();
        if (existingUsername) {
            throw createHttpError(400, 'Username already in use.');
        }

        const existingEmail = await User.findOne({ email: email }).exec();
        if (existingEmail) {
            throw createHttpError(400, 'Email already in use.');
        }

        const newUser = new User({
            username,
            email,
            password,
        });
        await newUser.save();

        // Generate OTP
        const OTP = generateVerificationCode();

        const newEmailVerificationToken = new EmailVerificationToken({
            owner: newUser._id,
            token: OTP,
        });
        await newEmailVerificationToken.save();

        await sendMail({
            from: 'verification@storysync.com',
            to: newUser.email,
            subject: 'Welcome to StorySync! Confirm Your Email Address',
            html: `
            <p>
            Dear ${newUser.username},
            <p>
            <p>
            Thank you for registering with StorySync! We're thrilled to have you on board. Before you can start exploring and sharing your reviews, we need to verify your email address.
            </p>
            <h4>Your verification Code: ${OTP}</h4>
            <p>
            Best regards,
            <br />
            StorySync Team
            </p>
            `,
        });

        res.status(201).json({
            user: newUser._id,
            message:
                'Please verify your email. Verification code has been sent to your email address.',
        });
    } catch (error) {
        next(error);
    }
};

interface VerifyEmailBody {
    userId: string;
    verificationCode: string;
}

export const verifyEmail: RequestHandler<
    unknown,
    unknown,
    VerifyEmailBody,
    unknown
> = async (req, res, next) => {
    const { userId, verificationCode } = req.body;

    try {
        if (!isValidObjectId(userId)) {
            throw createHttpError(400, 'Invalid User');
        }

        const user = await User.findById(userId);

        if (!user) {
            throw createHttpError(400, 'Invalid User');
        }

        if (user.isVerified) {
            throw createHttpError(400, 'User is already verified');
        }

        const token = await EmailVerificationToken.findOne({ owner: userId });

        if (!token) {
            throw createHttpError(400, 'Invalid token');
        }

        const isMatched = await token.compareToken(verificationCode);
        if (!isMatched) {
            throw createHttpError(400, 'Invalid token');
        }

        user.isVerified = true;
        await user.save();

        await EmailVerificationToken.findByIdAndDelete(token._id);

        await sendMail({
            from: 'verification@storysync.com',
            to: user.email,
            subject: 'Congratulations! Your Account Has Been Verified',
            html: `
            <p>
            Dear ${user.username},
            <p>
            <p>Congratulations! Your email address has been successfully verified, and you are now officially part of the StorySync community.</p>
            <p>
            Best regards,
            <br />
            StorySync Team
            </p>
            `,
        });

        res.status(200).json({ message: 'Your email is verified' });
    } catch (error) {
        next(error);
    }
};

interface ResendVerificationCodeBody {
    userId: string;
}

export const resendVerficationCode: RequestHandler<
    unknown,
    unknown,
    ResendVerificationCodeBody,
    unknown
> = async (req, res, next) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            throw createHttpError(400, 'Invalid user');
        }

        if (user.isVerified) {
            throw createHttpError(400, 'Email is already verified');
        }

        const existingToken = await EmailVerificationToken.findOne({
            owner: userId,
        });
        if (existingToken) {
            throw createHttpError(
                400,
                'Verification code is already sent to registered email address. Please wait for one hour to generate another token.'
            );
        }

        // Generate OTP
        const OTP = generateVerificationCode();

        const newEmailVerificationToken = new EmailVerificationToken({
            owner: user._id,
            token: OTP,
        });
        await newEmailVerificationToken.save();

        await sendMail({
            from: 'verification@storysync.com',
            to: user.email,
            subject: 'Welcome to StorySync! Confirm Your Email Address',
            html: `
            <p>
            Dear ${user.username},
            <p>
            <p>
            Thank you for registering with StorySync! We're thrilled to have you on board. Before you can start exploring and sharing your reviews, we need to verify your email address.
            </p>
            <h4>Your verification Code: ${OTP}</h4>
            <p>
            Best regards,
            <br />
            StorySync Team
            </p>
            `,
        });

        res.status(200).json({
            message:
                'Please verify your email. Verification code has been sent to your email address.',
        });
    } catch (error) {
        next(error);
    }
};

interface PasswordResetRequestBody {
    emailOrUsername: string;
}

export const requestPasswordReset: RequestHandler<
    unknown,
    unknown,
    PasswordResetRequestBody,
    unknown
> = async (req, res, next) => {
    const { emailOrUsername } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ username: emailOrUsername }, { email: emailOrUsername }],
        }).exec();

        if (!user) {
            throw createHttpError(404, 'Invalid user');
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const newPasswordResetToken = new PasswordResetToken({
            owner: user._id,
            token: resetToken,
        });
        await newPasswordResetToken.save();

        const resetPasswordUrl = `http://localhost:5173/reset-password?token=${resetToken}&id=${user._id}`;

        await sendMail({
            from: 'verification@storysync.com',
            to: user.email,
            subject: 'Password Reset Request for Your StorySync Account',
            html: `
            <p>
            Dear ${user.username},
            <p>
            <p>
            We received a request to reset the password for your StorySync account associated with this email address. If you initiated this request, please follow the instructions below to reset your password.
            </p>
            <h4>Reset Your Password: ${resetPasswordUrl}</h4>
            <p>
            Best regards,
            <br />
            StorySync Team
            </p>
            `,
        });

        res.status(200).json({ message: 'Email sent for password reset' });
    } catch (error) {
        next(error);
    }
};

interface PasswordResetBody {
    token: string;
    userId: string;
    newPassword: string;
    confirmPassword: string;
}

export const resetPassword: RequestHandler<
    unknown,
    unknown,
    PasswordResetBody,
    unknown
> = async (req, res, next) => {
    const { token, userId, newPassword } = req.body;

    try {
        if (!token.trim() || !isValidObjectId(userId)) {
            throw createHttpError(400, 'Invalid request');
        }

        const resetToken = await PasswordResetToken.findOne({ owner: userId });
        if (!resetToken) {
            throw createHttpError(401, 'Invalid request');
        }

        const isMatched = await resetToken.compareToken(token);
        if (!isMatched) {
            throw createHttpError(401, 'Invalid request');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw createHttpError(404, 'Invalid user');
        }

        console.log('New Password: ', newPassword);
        const isPasswordMatched = await user.comparePassword(newPassword);
        if (isPasswordMatched) {
            throw createHttpError(
                400,
                'New password must be different from the previous one'
            );
        }

        user.password = newPassword;
        await user.save();

        await PasswordResetToken.findByIdAndDelete(resetToken._id);

        await sendMail({
            from: 'verification@storysync.com',
            to: user.email,
            subject: 'Password Reset Confirmation for Your StorySync Account',
            html: `
            <p>
            Dear ${user.username},
            <p>
            <p>
            We hope this message finds you well. We wanted to inform you that your password for StorySync has been successfully reset.
            </p>
            <p>
            Best regards,
            <br />
            StorySync Team
            </p>
            `,
        });

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    email: string;
    password: string;
}

export const login: RequestHandler<
    unknown,
    unknown,
    LoginBody,
    unknown
> = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw createHttpError(400, 'Invalid credentials');
        }

        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            throw createHttpError(400, 'Invalid credentials');
        }

        const token = jwt.sign({ userId: user._id }, env.JWT_SECRET_KEY, {
            expiresIn: '30d',
        });

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ userId: user._id });
    } catch (error) {
        next(error);
    }
};

export const validateUserToken = (req: Request, res: Response) => {
    res.status(200).send({ userId: req.userId });
};
