import express from 'express';
import { isAdmin, verifyToken } from '../middlewares/auth';
import { uploadImage } from '../middlewares/fileUpload';
import {
    createBook,
    deleteBook,
    getBook,
    getBooks,
    getLatestBooks,
    getRelatedBooks,
    getTopRatedBooks,
    updateBookCover,
    updateBookDetails,
} from '../controllers/books';
import {
    bookBodyValidator,
    bookUpdateBodyValidator,
    validate,
} from '../middlewares/validator';
import { parseData } from '../middlewares/helper';

const router = express.Router();

router.get('/', getBooks);

router.get('/latest', getLatestBooks);

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

router.patch(
    '/update-book-details/:bookId',
    verifyToken,
    isAdmin,
    bookUpdateBodyValidator,
    validate,
    updateBookDetails
);

router.patch(
    '/update-book-cover/:bookId',
    verifyToken,
    isAdmin,
    uploadImage.single('cover'),
    updateBookCover
);

router.delete('/delete/:bookId', verifyToken, isAdmin, deleteBook);

router.get('/top-rated', getTopRatedBooks);

router.get('/:bookId', getBook);

router.get('/related/:bookId', getRelatedBooks);

export default router;
