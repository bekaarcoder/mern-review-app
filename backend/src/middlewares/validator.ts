import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import { genres } from '../util/genres';
import { status } from '../util/readingStatus';

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

export const authorBodyValidator = [
    check('name').trim().notEmpty().withMessage('Name is required'),
    check('about').trim().notEmpty().withMessage('About is required'),
];

export const bookBodyValidator = [
    check('title').trim().notEmpty().withMessage('Book title is required'),
    check('description')
        .trim()
        .notEmpty()
        .withMessage('Book description is required'),
    check('author').trim().notEmpty().withMessage('Book author is required'),
    check('publishedDate').isDate().withMessage('Published date is required'),
    check('language').trim().notEmpty().withMessage('Language is required'),
    check('type').trim().notEmpty().withMessage('Book type is required'),
    check('status')
        .isIn(['private', 'public'])
        .withMessage('Status must be public or private'),
    check('genres')
        .isArray()
        .withMessage('Genres must be an array of genre')
        .custom((value) => {
            for (const genre of value) {
                if (!genres.includes(genre))
                    throw new Error(`Invalid genre: ${genre}`);
            }
            return true;
        }),
    check('tags')
        .isArray({ min: 1 })
        .withMessage('Tags must be an array of string')
        .custom((value) => {
            for (const tag of value) {
                console.log('Tag: ', tag);
                if (typeof tag !== 'string' || tag === '')
                    throw new Error(`Invalid tag: ${tag}`);
            }
            return true;
        }),
    check('cover').custom((_, { req }) => {
        if (!req.file) throw new Error('Cover image is required');
        return true;
    }),
];

export const bookUpdateBodyValidator = [
    check('title').trim().notEmpty().withMessage('Title is required'),
    check('description')
        .trim()
        .notEmpty()
        .withMessage('Book description is required'),
    check('author').trim().notEmpty().withMessage('Book author is required'),
    check('publishedDate').isDate().withMessage('Published date is required'),
    check('language').trim().notEmpty().withMessage('Language is required'),
    check('type').trim().notEmpty().withMessage('Book type is required'),
    check('status')
        .isIn(['private', 'public'])
        .withMessage('Status must be public or private'),
    check('genres')
        .isArray()
        .withMessage('Genres must be an array of genre')
        .custom((value) => {
            for (const genre of value) {
                if (!genres.includes(genre))
                    throw new Error(`Invalid genre: ${genre}`);
            }
            return true;
        }),
    check('tags')
        .isArray({ min: 1 })
        .withMessage('Tags must be an array of string')
        .custom((value) => {
            for (const tag of value) {
                console.log('Tag: ', tag);
                if (typeof tag !== 'string' || tag === '')
                    throw new Error(`Invalid tag: ${tag}`);
            }
            return true;
        }),
];

export const reviewBodyValidator = [
    check('rating')
        .isFloat({ min: 1, max: 5 })
        .withMessage('Please provide a rating between 1 and 5'),
];

export const shelfBodyValidator = [
    check('name').trim().notEmpty().withMessage('Shelf name is required'),
];

export const readingStatusValidator = [
    check('status').isIn(status).withMessage('Invalid value for status'),
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
