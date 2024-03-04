import express from 'express';
import { verifyToken } from '../middlewares/auth';
import { reviewBodyValidator, validate } from '../middlewares/validator';
import {
    addReview,
    getReviewsByBook,
    removeReview,
    updateReview,
} from '../controllers/review';

const router = express.Router();

router.post(
    '/add/:bookId',
    verifyToken,
    reviewBodyValidator,
    validate,
    addReview
);

router.patch(
    '/:reviewId',
    verifyToken,
    reviewBodyValidator,
    validate,
    updateReview
);

router.delete('/:reviewId', verifyToken, removeReview);

router.get('/:bookId', getReviewsByBook);

export default router;
