import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../util/validateEnv';
import User from '../models/User';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies['auth_token'];

    if (!token) {
        throw createHttpError(401, 'Unauthorized');
    }

    try {
        const decode = jwt.verify(token, env.JWT_SECRET_KEY);
        req.userId = (decode as JwtPayload).userId;
        next();
    } catch (error) {
        next(error);
    }
};

export const isAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            throw createHttpError(403, 'Not Allowed');
        }

        if (user.role !== 'admin') {
            throw createHttpError(403, 'Forbidden Request');
        }

        next();
    } catch (error) {
        next(error);
    }
};
