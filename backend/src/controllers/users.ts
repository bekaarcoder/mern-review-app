import { RequestHandler } from 'express';

export const createUser: RequestHandler = (req, res) => {
    res.send('Creating a user');
};
