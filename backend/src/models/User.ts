import bcrypt from 'bcrypt';
import { Document, Schema, model } from 'mongoose';

interface User extends Document {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    role: string;
    comparePassword(newPassword: string): Promise<boolean>;
}

const userSchema = new Schema<User>({
    username: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        require: true,
        default: false,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['admin', 'user'],
    },
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (newPassword: string) {
    const result = await bcrypt.compare(newPassword, this.password);
    return result;
};

// type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema);
