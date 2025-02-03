import { Request, Response } from 'express';
import { data } from '../data';

export const register = (req: Request, res: Response) => {
    data.subscriptions.push(req.body);
    console.log('Subscription added');
    res.sendStatus(201);
}