import bcrypt from 'bcrypt';
import { Document, Schema, model } from 'mongoose';

interface PasswordResetToken extends Document {
    owner: Schema.Types.ObjectId;
    token: string;
    createdAt: Date;
    compareToken(token: string): Promise<boolean>;
}

const passwordResetTokenSchema = new Schema<PasswordResetToken>({
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

passwordResetTokenSchema.pre('save', async function (next) {
    if (this.isModified('token')) {
        this.token = await bcrypt.hash(this.token, 10);
    }

    next();
});

passwordResetTokenSchema.methods.compareToken = async function (token: string) {
    const result = await bcrypt.compare(token, this.token);
    return result;
};

// type PasswordResetToken = InferSchemaType<
//     typeof PasswordResetTokenSchema
// >;

export default model<PasswordResetToken>(
    'PasswordResetToken',
    passwordResetTokenSchema
);
