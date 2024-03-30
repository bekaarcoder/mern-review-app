import { InferSchemaType, Schema, model } from 'mongoose';
import { genres } from '../util/genres';

const bookSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'Author',
            trim: true,
            required: true,
        },
        publishedDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['public', 'private'],
        },
        pages: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        genres: {
            type: [String],
            required: true,
            enum: genres,
        },
        tags: {
            type: [String],
            required: true,
        },
        cover: {
            type: Object,
            url: { type: String, required: true },
            public_id: { type: String, required: true },
            required: true,
        },
        reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
        language: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

type Book = InferSchemaType<typeof bookSchema>;

export default model<Book>('Book', bookSchema);
