import { RequestHandler } from 'express';
import User from '../models/User';

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
