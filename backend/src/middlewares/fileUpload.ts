import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

const storage = multer.diskStorage({});

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    if (!file.mimetype.startsWith('image')) {
        cb(new Error('Only image files are supported!'));
        cb(null, false);
    }
    cb(null, true);
};

export const uploadImage = multer({
    storage: storage,
    fileFilter,
});
