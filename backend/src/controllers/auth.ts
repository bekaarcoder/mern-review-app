import { RequestHandler } from 'express';
import User from '../models/User';
import createHttpError from 'http-errors';

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

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};
