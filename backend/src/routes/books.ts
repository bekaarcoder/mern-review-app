import express from 'express';
import { isAdmin, verifyToken } from '../middlewares/auth';
import { uploadImage } from '../middlewares/fileUpload';
import { createBook } from '../controllers/books';
import { bookBodyValidator, validate } from '../middlewares/validator';
import { parseData } from '../middlewares/helper';

const router = express.Router();

router.post(
    '/create',
    verifyToken,
    isAdmin,
    uploadImage.single('cover'),
    parseData,
    bookBodyValidator,
    validate,
    createBook
);

export default router;
