import express from 'express';
import { verifyToken } from '../middlewares/auth';
import {
    addBookToShelf,
    addShelf,
    getBookShelvesCount,
    getBooksByReadingShelf,
    getReadingStatus,
    removeReadingStatus,
    updateReadingStatus,
} from '../controllers/shelf';
import {
    readingStatusValidator,
    shelfBodyValidator,
    validate,
} from '../middlewares/validator';

const router = express.Router();

router.post('/', verifyToken, shelfBodyValidator, validate, addShelf);

router.post('/add-book/:shelfId', verifyToken, addBookToShelf);

router.post(
    '/update-status/:bookId',
    verifyToken,
    readingStatusValidator,
    validate,
    updateReadingStatus
);

router.get('/status/:bookId', verifyToken, getReadingStatus);

router.delete('/remove/:bookId', verifyToken, removeReadingStatus);

router.get('/count', verifyToken, getBookShelvesCount);

router.get('/readingShelf', verifyToken, getBooksByReadingShelf);

export default router;
