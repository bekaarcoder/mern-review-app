import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import Book from '../models/Book';
import Review from '../models/Review';

export const addReview = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { bookId } = req.params;
        const { content, rating } = req.body;

        if (!isValidObjectId(bookId)) {
            throw createHttpError(400, 'Invalid Book id');
        }

        const book = await Book.findOne({ _id: bookId, status: 'public' });
        if (!book) {
            throw createHttpError(404, 'Book not found');
        }

        // Check if review already exist for the book
        const existingReview = await Review.findOne({
            owner: req.userId,
            parentBook: book._id,
        });
        if (existingReview) {
            throw createHttpError(400, 'Book already reviewed');
        }

        // Create review
        const newReview = new Review({
            owner: req.userId,
            parentBook: book._id,
            content,
            rating,
        });
        await newReview.save();

        // Update book with review
        book.reviews.push(newReview._id);
        await book.save();

        res.status(201).json(newReview);
    } catch (error) {
        next(error);
    }
};

export const updateReview = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { reviewId } = req.params;
        const { content, rating } = req.body;

        if (!isValidObjectId(reviewId)) {
            throw createHttpError(400, 'Invalid review id');
        }

        const review = await Review.findOne({
            _id: reviewId,
            owner: req.userId,
        });
        if (!review) {
            throw createHttpError(404, 'Review not found');
        }

        review.content = content;
        review.rating = rating;
        await review.save();

        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
};

export const removeReview = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { reviewId } = req.params;

        if (!isValidObjectId(reviewId))
            throw createHttpError(400, 'invalid review id');

        const review = await Review.findOne({
            _id: reviewId,
            owner: req.userId,
        });
        if (!review) throw createHttpError(404, 'Review not found');

        // remove this review from the book as well
        const book = await Book.findById(review.parentBook).select('reviews');
        if (!book) throw createHttpError(404, 'Book not found');
        book.reviews = book.reviews.filter(
            (rId) => rId.toString() !== reviewId
        );
        await book.save();

        await review.deleteOne();

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const getReviewsByMovie = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { bookId } = req.params;

        if (!isValidObjectId(bookId))
            throw createHttpError(400, 'Invalid book id');

        const book = await Book.findById(bookId)
            .populate({
                path: 'reviews',
                populate: {
                    path: 'owner',
                    select: 'username',
                },
            })
            .select('reviews');
        if (!book) throw createHttpError(404, 'Book not found');

        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};
