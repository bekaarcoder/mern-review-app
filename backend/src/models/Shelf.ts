import { InferSchemaType, Schema, model } from 'mongoose';

const shelfSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        name: {
            type: String,
            required: true,
        },
        books: [
            {
                book: { type: Schema.Types.ObjectId, ref: 'Book' },
                dateAdded: { type: Date, default: Date.now },
            },
        ],
    },
    {
        timestamps: true,
    }
);

type Shelf = InferSchemaType<typeof shelfSchema>;

export default model<Shelf>('Shelf', shelfSchema);
