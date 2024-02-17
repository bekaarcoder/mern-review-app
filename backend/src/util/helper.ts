import { PipelineStage, Types } from 'mongoose';

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
