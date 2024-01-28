import { InferSchemaType, Schema, model } from 'mongoose';

const authorSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        about: {
            type: String,
            trim: true,
            required: true,
        },
        avatar: {
            type: Object,
            url: String,
            public_id: String,
        },
    },
    { timestamps: true }
);

type Author = InferSchemaType<typeof authorSchema>;

export default model<Author>('Author', authorSchema);
