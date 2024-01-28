import { RequestHandler } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import Author from '../models/Author';

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

        // Upload avatar in cloudinary
        const { secure_url, public_id } = await cloudinary.uploader.upload(
            imageFile.path
        );

        newAuthor.avatar = {
            url: secure_url,
            public_id: public_id,
        };
        await newAuthor.save();

        res.status(201).json(newAuthor);
    } catch (error) {
        next(error);
    }
};
