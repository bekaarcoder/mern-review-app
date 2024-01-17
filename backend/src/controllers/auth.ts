import { RequestHandler } from 'express';
import User from '../models/User';
import createHttpError from 'http-errors';
import EmailVerificationToken from '../models/EmailVerificationToken';
import sendMail from '../util/mailer';
import { isValidObjectId } from 'mongoose';

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
        const OTP = Math.floor(Math.random() * 900000 + 100000);

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
        const OTP = Math.floor(Math.random() * 900000 + 100000);

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

        res.status(201).json({
            message:
                'Please verify your email. Verification code has been sent to your email address.',
        });
    } catch (error) {
        next(error);
    }
};
