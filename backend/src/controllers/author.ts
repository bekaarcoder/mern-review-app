import { NextFunction, Request, RequestHandler, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import Author from '../models/Author';
import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

interface AuthorBody {
    name: string;
    about: string;
}

export const createAuthor: RequestHandler<
    unknown,
    unknown,
    AuthorBody,
    unknown
> = async (req, res, next) => {
    try {
        const { name, about } = req.body;
        const imageFile = req.file as Express.Multer.File;

        const newAuthor = new Author({
            name,
            about,
        });

        // Upload avatar in cloudinary if file is present
        if (imageFile) {
            const { secure_url, public_id } = await uploadImage(imageFile);
            newAuthor.avatar = {
                url: secure_url,
                public_id: public_id,
            };
        }

        await newAuthor.save();

        res.status(201).json(newAuthor);
    } catch (error) {
        next(error);
    }
};

export const updateAuthor: RequestHandler = async (req, res, next) => {
    const authorId = req.params.authorId;
    const { name, about } = req.body;
    const imageFile = req.file as Express.Multer.File;
    try {
        if (!isValidObjectId(authorId)) {
            throw createHttpError(400, 'Invalid author id');
        }

        const author = await Author.findById(authorId);
        if (!author) {
            throw createHttpError(400, 'Author not found');
        }

        // Check if file is present
        if (imageFile) {
            // remove the previous image if exists
            const existing_public_id = author.avatar?.public_id;
            if (existing_public_id) {
                const { result } = await cloudinary.uploader.destroy(
                    existing_public_id
                );
                if (result !== 'ok')
                    throw createHttpError(
                        500,
                        'Something went wrong while deleting image from cloudinary'
                    );
            }

            // Upload new image
            const { secure_url, public_id } = await uploadImage(imageFile);
            author.avatar = {
                url: secure_url,
                public_id: public_id,
            };
        }

        author.name = name;
        author.about = about;

        const updatedAuthor = await author.save();
        res.status(200).json(updatedAuthor);
    } catch (error) {
        next(error);
    }
};

export const deleteAuthor: RequestHandler = async (req, res, next) => {
    const { authorId } = req.params;
    try {
        if (!isValidObjectId(authorId)) {
            throw createHttpError(400, 'Invalid author id');
        }

        const author = await Author.findById(authorId);
        if (!author) throw createHttpError(400, 'Author not found');

        // remove image from cloudinary if avatar exists
        const public_id = author.avatar?.public_id;
        if (public_id) {
            const { result } = await cloudinary.uploader.destroy(public_id);
            if (result !== 'ok')
                throw createHttpError(
                    500,
                    'Something went wrong while deleting image from cloudinary'
                );
        }

        await author.deleteOne();

        res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
        next(error);
    }
};

type SearchQuery = {
    name: string;
};

export const searchAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const query = req.query as SearchQuery;
    try {
        const result = await Author.find({
            $text: { $search: `"${query.name}"` },
        });

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getAuthors = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { pageNo, limit } = req.query;

    const responseLimit = parseInt(limit ? limit.toString() : '3');
    const pageNumber = parseInt(pageNo ? pageNo.toString() : '0');

    try {
        const totalDocuments = await Author.countDocuments({});
        const totalPage = Math.ceil(totalDocuments / responseLimit);
        const hasPrevious = pageNumber + 1 > 1;
        const hasNext = pageNumber + 1 < totalPage;

        const authors = await Author.find()
            .sort({ createdAt: 'desc' })
            .skip(pageNumber * responseLimit)
            .limit(responseLimit);
        res.status(200).json({
            authors,
            total: totalDocuments,
            pages: totalPage,
            page: pageNumber,
            hasNext,
            hasPrevious,
        });
    } catch (error) {
        next(error);
    }
};

export const getAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authorId = req.params.authorId;
    try {
        if (!isValidObjectId(authorId)) {
            throw createHttpError(400, 'Invalid author id');
        }

        const author = await Author.findById(authorId);
        if (!author) throw createHttpError(400, 'Author not found');

        res.status(200).json(author);
    } catch (error) {
        next(error);
    }
};

async function uploadImage(imageFile: Express.Multer.File) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
        imageFile.path,
        {
            gravity: 'face',
            height: 250,
            width: 250,
            zoom: '0.75',
            crop: 'thumb',
        }
    );
    return { secure_url, public_id };
}
