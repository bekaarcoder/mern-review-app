import express from 'express';
import { verifyToken } from '../middlewares/auth';
import {
    addBookToShelf,
    addShelf,
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

export default router;
