import { cleanEnv, port, str } from 'envalid';

export default cleanEnv(process.env, {
    PORT: port(),
    MONGO_CONNECTION_URI: str(),
    JWT_SECRET_KEY: str(),
    MAILTRAP_USER: str(),
    MAILTRAP_PASSWORD: str(),
});
