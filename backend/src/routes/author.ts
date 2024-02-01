import express from 'express';
import {
    createAuthor,
    deleteAuthor,
    getAuthor,
    getAuthors,
    searchAuthor,
    updateAuthor,
} from '../controllers/author';
import { uploadImage } from '../middlewares/fileUpload';
import { authorBodyValidator, validate } from '../middlewares/validator';
import { isAdmin, verifyToken } from '../middlewares/auth';

const router = express.Router();

router.get('/', getAuthors);

router.post(
    '/create',
    verifyToken,
    isAdmin,
    uploadImage.single('avatar'),
    authorBodyValidator,
    validate,
    createAuthor
);

router.put(
    '/update/:authorId',
    verifyToken,
    isAdmin,
    uploadImage.single('avatar'),
    authorBodyValidator,
    validate,
    updateAuthor
);

router.delete('/delete/:authorId', verifyToken, isAdmin, deleteAuthor);

router.get('/search', searchAuthor);

router.get('/:authorId', getAuthor);

export default router;
