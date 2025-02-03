import webpush from 'web-push';
import { Request, Response } from 'express';
import { data } from '../data';

export const sendMessage = (req: Request, res: Response) => {
    const subscriptions = data.subscriptions;
    const payload = null;
    const options = {
        TTL: 60
    };
    subscriptions.forEach((subscription: any) => {
        webpush.sendNotification(subscription, payload, options)
            .then(() => {
                console.log('Notification sent to:', subscription.endpoint);
            })
            .catch((err: any) => {
                console.error('Error sending notification:', err);
                res.sendStatus(500);
            });
    });
    res.sendStatus(200);
}