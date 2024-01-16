import { InferSchemaType, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const emailVerificationTokenSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: 1 * 60 * 60, // expires after 1 hr
        default: Date.now(),
    },
});

emailVerificationTokenSchema.pre('save', async function (next) {
    if (this.isModified('token')) {
        this.token = await bcrypt.hash(this.token, 10);
    }

    next();
});

type EmailVerificationToken = InferSchemaType<
    typeof emailVerificationTokenSchema
>;

export default model<EmailVerificationToken>(
    'EmailVerificationToken',
    emailVerificationTokenSchema
);
