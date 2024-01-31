import { v2 as cloudinary } from 'cloudinary';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import Author from '../models/Author';
import Book from '../models/Book';

type BookType = {
    title: string;
    description: string;
    author: string;
    publishedDate: Date;
    status: 'public' | 'private';
    type: string;
    genres: string[];
    tags: string[];
    language: string;
};

export const createBook = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const newBook: BookType = req.body;
        const imageFile = req.file as Express.Multer.File;

        if (!isValidObjectId(newBook.author)) {
            throw createHttpError(400, 'Invalid Author ID');
        }

        const author = await Author.findById(newBook.author);
        if (!author) {
            throw createHttpError(404, 'Author not found');
        }

        const book = new Book(newBook);

        const { secure_url, public_id } = await uploadCoverImage(imageFile);
        book.cover = {
            url: secure_url,
            public_id: public_id,
        };

        await book.save();

        res.status(201).json(book);
    } catch (error) {
        next(error);
    }
};

export const updateBookDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { bookId } = req.params;
        const bookDetails: BookType = req.body;

        if (!isValidObjectId(bookId))
            throw createHttpError(400, 'Invalid movie id');

        const book = await Book.findById(bookId);
        if (!book) throw createHttpError(404, 'Book not found');

        if (!isValidObjectId(bookDetails.author))
            throw createHttpError(400, 'Invalid author id');

        const author = await Author.findById(bookDetails.author);
        if (!author) throw createHttpError(404, 'Author not found');

        book.author = author.id;
        book.title = bookDetails.title;
        book.description = bookDetails.description;
        book.publishedDate = bookDetails.publishedDate;
        book.status = bookDetails.status;
        book.type = bookDetails.type;
        book.genres = bookDetails.genres;
        book.tags = bookDetails.tags;
        book.language = bookDetails.language;

        const updatedBook = await book.save();
        res.status(200).json(updatedBook);
    } catch (error) {
        next(error);
    }
};

export const updateBookCover = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { bookId } = req.params;
        const imageFile = req.file as Express.Multer.File;

        if (!imageFile) throw createHttpError(400, 'Cover image is required');

        if (!isValidObjectId(bookId))
            throw createHttpError(400, 'Invalid book id');

        const book = await Book.findById(bookId);
        if (!book) throw createHttpError(404, 'Book not found');

        // Delete previous cover image if exists
        const existing_public_id = book.cover?.public_id;
        if (existing_public_id) {
            const { result } = await cloudinary.uploader.destroy(
                existing_public_id
            );
            if (result !== 'ok')
                throw createHttpError(
                    500,
                    'Something went wrong while deleting cover image'
                );
        }

        const { secure_url, public_id } = await uploadCoverImage(imageFile);
        book.cover = {
            url: secure_url,
            public_id: public_id,
        };

        const updatedBook = await book.save();
        res.status(200).json(updatedBook);
    } catch (error) {
        next(error);
    }
};

export default async function uploadCoverImage(imageFile: Express.Multer.File) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
        imageFile.path
    );
    return { secure_url, public_id };
}
