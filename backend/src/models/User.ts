import bcrypt from 'bcrypt';
import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema({
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
        select: false,
    },
    isVerified: {
        type: Boolean,
        require: true,
        default: false,
    },
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema);
