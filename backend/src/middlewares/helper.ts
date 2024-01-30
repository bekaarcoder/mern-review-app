import { NextFunction, Request, Response } from 'express';

export const parseData = (req: Request, res: Response, next: NextFunction) => {
    const { genres, tags } = req.body;

    if (genres) req.body.genres = JSON.parse(genres);
    if (tags) req.body.tags = JSON.parse(tags);

    next();
};
