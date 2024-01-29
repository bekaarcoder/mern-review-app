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

const router = express.Router();

router.get('/', getAuthors);

router.get('/:authorId', getAuthor);

router.post(
    '/create',
    uploadImage.single('avatar'),
    authorBodyValidator,
    validate,
    createAuthor
);

router.put(
    '/update/:authorId',
    uploadImage.single('avatar'),
    authorBodyValidator,
    validate,
    updateAuthor
);

router.delete('/delete/:authorId', deleteAuthor);

router.get('/search', searchAuthor);

export default router;
