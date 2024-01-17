import bcrypt from 'bcrypt';
import { Document, Schema, model } from 'mongoose';

interface EmailVerificationToken extends Document {
    owner: Schema.Types.ObjectId;
    token: string;
    createdAt: Date;
    compareToken(token: string): Promise<boolean>;
}

const emailVerificationTokenSchema = new Schema<EmailVerificationToken>({
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

emailVerificationTokenSchema.methods.compareToken = async function (
    token: string
) {
    const result = await bcrypt.compare(token, this.token);
    return result;
};

// type EmailVerificationToken = InferSchemaType<
//     typeof emailVerificationTokenSchema
// >;

export default model<EmailVerificationToken>(
    'EmailVerificationToken',
    emailVerificationTokenSchema
);
