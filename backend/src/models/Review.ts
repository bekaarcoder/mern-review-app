import { InferSchemaType, Schema, model } from 'mongoose';

const reviewSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    parentBook: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    content: {
        type: String,
        trim: true,
    },
    rating: {
        type: Number,
        required: true,
    },
});

type Review = InferSchemaType<typeof reviewSchema>;

export default model<Review>('Review', reviewSchema);
