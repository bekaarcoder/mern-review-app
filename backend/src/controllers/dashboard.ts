import { NextFunction, Request, Response } from 'express';
import Book from '../models/Book';
import User from '../models/User';
import Review from '../models/Review';
import Author from '../models/Author';

export const getDashboardCount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const allBooks = await Book.countDocuments();
        const allUsers = await User.countDocuments();
        const allReviews = await Review.countDocuments();
        const allAuthors = await Author.countDocuments();

        res.status(200).json({
            books: allBooks,
            authors: allAuthors,
            reviews: allReviews,
            users: allUsers,
        });
    } catch (error) {
        next(error);
    }
};
