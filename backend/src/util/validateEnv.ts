import { cleanEnv, port, str } from 'envalid';

export default cleanEnv(process.env, {
    PORT: port(),
    MONGO_CONNECTION_URI: str(),
    JWT_SECRET_KEY: str(),
    MAILTRAP_USER: str(),
    MAILTRAP_PASSWORD: str(),
    CLOUDINARY_CLOUD_NAME: str(),
    CLOUDINARY_API_KEY: str(),
    CLOUDINARY_API_SECRET: str(),
});
