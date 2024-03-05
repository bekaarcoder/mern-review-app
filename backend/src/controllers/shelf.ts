import { NextFunction, Request, Response } from 'express';
import Shelf from '../models/Shelf';
import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import Book from '../models/Book';
import ReadingStatus from '../models/ReadingStatus';

export const addShelf = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name } = req.body;

        const existingShelf = await Shelf.findOne({ name, user: req.userId });
        console.log(existingShelf);
        if (existingShelf) {
            throw createHttpError(
                400,
                'Shelf already exist with the same name'
            );
        }

        const newShelf = new Shelf({
            name: name,
            user: req.userId,
        });

        await newShelf.save();

        res.status(201).json(newShelf);
    } catch (error) {
        next(error);
    }
};

export const addBookToShelf = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { shelfId } = req.params;
        const { bookId } = req.body;

        // Check ShelfId and BookId are valid
        if (!isValidObjectId(shelfId))
            throw createHttpError(400, 'Invalid Shelf Id');
        if (!isValidObjectId(bookId))
            throw createHttpError(400, 'Invalid Book Id');

        // Check if BookShelf exist for the user
        const bookShelf = await Shelf.findOne({
            _id: shelfId,
            user: req.userId,
        });
        if (!bookShelf) throw createHttpError(404, 'Book Shelf does not exist');

        // Check if Book exist in the DB
        const book = await Book.findById(bookId);
        if (!book) throw createHttpError(404, 'Book does not exist');

        // Check if book is already added
        const isBookOnShelf = bookShelf.books.some((item) =>
            item.book?.equals(bookId)
        );
        if (isBookOnShelf)
            throw createHttpError(400, 'Book already exists on the shelf');

        bookShelf.books.push({ book: bookId });
        await bookShelf.save();

        res.status(200).json({
            message: 'Book successfully added to shelf',
            bookShelf,
        });
    } catch (error) {
        next(error);
    }
};

export const updateReadingStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { bookId } = req.params;
        const { status } = req.body;

        if (!isValidObjectId(bookId))
            throw createHttpError(400, 'Invalid Book Id');

        const book = await Book.findById(bookId);
        if (!book) throw createHttpError(404, 'Book does not exist');

        const existingStatus = await ReadingStatus.findOne({
            book: book._id,
            user: req.userId,
        });
        if (existingStatus) {
            existingStatus.status = status;
            await existingStatus.save();
        } else {
            const newReadingStatus = new ReadingStatus({
                book: book._id,
                status,
                user: req.userId,
            });
            await newReadingStatus.save();
        }

        res.status(200).json({
            message: 'Reading status updated successfully',
        });
    } catch (error) {
        next(error);
    }
};
