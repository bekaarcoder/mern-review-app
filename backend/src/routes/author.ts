import express from 'express';
import { createAuthor } from '../controllers/author';
import { uploadImage } from '../middlewares/fileUpload';
import { authorBodyValidator, validate } from '../middlewares/validator';

const router = express.Router();

router.post(
    '/create',
    uploadImage.single('avatar'),
    authorBodyValidator,
    validate,
    createAuthor
);

export default router;
