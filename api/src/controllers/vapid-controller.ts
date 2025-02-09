import { Request, Response } from 'express';

export const getVapidPublicKey = (req: Request, res: Response) => {
    res.send(process.env.VAPID_PUBLIC_KEY);
}