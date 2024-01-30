import { NextFunction, Request, Response } from 'express';
import Author from '../models/Author';
import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import Book from '../models/Book';

type BookType = {
    title: string;
    description: string;
    author: string;
    publishedDate: Date;
    status: string;
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

export default async function uploadCoverImage(imageFile: Express.Multer.File) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
        imageFile.path
    );
    return { secure_url, public_id };
}
