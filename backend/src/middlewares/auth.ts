import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../util/validateEnv';

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
        throw createHttpError(401, 'Unauthorized');
    }
};
