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

export const getReadingStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { bookId } = req.params;

        if (!isValidObjectId) throw createHttpError(400, 'Invalid Book Id');

        const book = await Book.findById(bookId);
        if (!book) throw createHttpError(404, 'Book not found');

        const readingStatus = await ReadingStatus.findOne({
            book: book._id,
            user: req.userId,
        });
        if (!readingStatus) {
            res.status(200).json({ status: null });
        } else {
            res.status(200).json(readingStatus);
        }
    } catch (error) {
        next(error);
    }
};

export const removeReadingStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { bookId } = req.params;

        if (!isValidObjectId) throw createHttpError(400, 'Invalid Book Id');

        const book = await Book.findById(bookId);
        if (!book) throw createHttpError(404, 'Book not found');

        const readingStatus = await ReadingStatus.findOne({
            book: book._id,
            user: req.userId,
        });
        if (!readingStatus) {
            throw createHttpError(404, 'Book not found in your shelf');
        }

        await readingStatus.deleteOne();
        res.status(200).json({ message: 'Book removed from shelf' });
    } catch (error) {
        next(error);
    }
};

export const getBookShelvesCount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const query = { user: req.userId };
        const all = await ReadingStatus.countDocuments(query);
        const wantToRead = await ReadingStatus.countDocuments({
            status: 'Want To Read',
            ...query,
        });
        const read = await ReadingStatus.countDocuments({
            status: 'Read',
            ...query,
        });
        const currentlyReading = await ReadingStatus.countDocuments({
            status: 'Currently Reading',
            ...query,
        });
        res.status(200).json({ all, wantToRead, read, currentlyReading });
    } catch (error) {
        next(error);
    }
};

interface ShelfQuery {
    user: string;
    status?: string;
}

export const getBooksByReadingShelf = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { shelf } = req.query;
        const validShelves = ['Currently Reading', 'Read', 'Want To Read'];

        const query: ShelfQuery = { user: req.userId };

        if (
            shelf !== undefined &&
            shelf !== null &&
            shelf !== '' &&
            validShelves.includes(shelf.toString())
        ) {
            query.status = shelf.toString();
        }

        const bookShelves = await ReadingStatus.find(query).populate({
            path: 'book',
            select: 'title cover pages',
            populate: {
                path: 'author',
                select: 'name',
            },
        });
        res.status(200).json(bookShelves);
    } catch (error) {
        next(error);
    }
};

export const updateReadingProgress = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { bookId } = req.params;
        const { progress } = req.body;

        if (!isValidObjectId(bookId)) {
            throw createHttpError(400, 'Invalid Book Id');
        }

        const book = await Book.findById(bookId);
        if (!book) throw createHttpError(404, 'Book not found');

        const bookStatus = await ReadingStatus.findOne({
            book: book._id,
            user: req.userId,
            status: 'Currently Reading',
        });

        if (!bookStatus)
            throw createHttpError(404, 'Book not found in your shelf');

        bookStatus.completionPercentage = progress;
        await bookStatus.save();

        res.status(200).json(bookStatus);
    } catch (error) {
        next(error);
    }
};
