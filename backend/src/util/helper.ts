import { PipelineStage, Types } from 'mongoose';
import Review from '../models/Review';

export const generateVerificationCode = (): number => {
    const OTP = Math.floor(Math.random() * 900000 + 100000);
    return OTP;
};

export const averageRatingPipeline = (
    bookId: Types.ObjectId
): PipelineStage[] => {
    return [
        {
            $lookup: {
                from: 'Review',
                localField: 'rating',
                foreignField: '_id',
                as: 'averageRating',
            },
        },
        {
            $match: { parentBook: bookId },
        },
        {
            $group: {
                _id: null,
                ratingAverage: {
                    $avg: '$rating',
                },
                reviewCount: {
                    $sum: 1,
                },
            },
        },
    ];
};

export const relatedBooksPipeline = (
    bookId: Types.ObjectId,
    tags: string[]
): PipelineStage[] => {
    return [
        {
            $lookup: {
                from: 'Book',
                localField: 'tags',
                foreignField: '_id',
                as: 'relatedBooks',
            },
        },
        {
            $match: {
                tags: { $in: [...tags] },
                _id: { $ne: bookId },
            },
        },
        {
            $project: {
                title: 1,
                cover: '$cover.url',
            },
        },
        {
            $limit: 5,
        },
    ];
};

export type BookReview = {
    averageRating?: string;
    reviewCount?: number;
};

export const getBookReview = async (bookId: Types.ObjectId) => {
    const bookReview: BookReview = {};

    const [aggregatedReview] = await Review.aggregate(
        averageRatingPipeline(bookId)
    );

    if (aggregatedReview) {
        const { ratingAverage, reviewCount } = aggregatedReview;
        bookReview.averageRating = parseFloat(ratingAverage).toFixed(1);
        bookReview.reviewCount = reviewCount;
    }

    return bookReview;
};
