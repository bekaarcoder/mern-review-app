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

export const loginBodyValidator = [
    check('email').normalizeEmail().isEmail().withMessage('Email is invalid'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is required'),
];

export const passwordResetRequestBodyValidator = [
    check('emailOrUsername')
        .trim()
        .notEmpty()
        .withMessage('Username or email is required'),
];

export const passwordResetBodyValidator = [
    check('newPassword')
        .trim()
        .notEmpty()
        .withMessage('Password must be at least 8 characters')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),
    check('confirmPassword')
        .trim()
        .notEmpty()
        .withMessage('Confirm Password must be at least 8 characters')
        .isLength({ min: 8 })
        .withMessage('Confirm Password must be at least 8 characters'),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.newPassword) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req).array();
    if (error.length) {
        console.error(error);
        console.log(error[0].msg);
        throw createHttpError(400, error[0].msg);
    }
    next();
};
