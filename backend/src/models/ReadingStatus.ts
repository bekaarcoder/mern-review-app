import { InferSchemaType, Schema, model } from 'mongoose';
import { status } from '../util/readingStatus';

const readingStatusSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: status,
        },
        book: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },
        completionPercentage: {
            type: Number,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

type ReadingStatus = InferSchemaType<typeof readingStatusSchema>;

export default model<ReadingStatus>('ReadingStatus', readingStatusSchema);
