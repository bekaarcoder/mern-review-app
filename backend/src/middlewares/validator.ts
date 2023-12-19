import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import createHttpError from 'http-errors';

export const signUpBodyValidator = [
    check('username')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Username is required'),
    check('email').normalizeEmail().isEmail().withMessage('Email is invalid'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req).array();
    if (error.length) {
        console.log(error[0].msg);
        throw createHttpError(400, error[0].msg);
    }
    next();
};
