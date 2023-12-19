import mongoose from 'mongoose';
import app from './app';
import env from './util/validateEnv';

const port = env.PORT || 5050;

mongoose
    .connect(env.MONGO_CONNECTION_URI)
    .then(() => {
        console.log('Connected to database');
        app.listen(port, () => {
            console.log(`Server started at port:${port}`);
        });
    })
    .catch((error) => {
        console.error(error);
    });
