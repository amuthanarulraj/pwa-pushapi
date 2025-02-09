import webpush from 'web-push';
import { Request, Response } from 'express';
import { data } from '../data';

export const sendMessage = async (req: Request, res: Response) => {
    const subscriptions = data.subscriptions;
    const payload = null;
    const vapidDetails = {
        subject: "https://localhost:3002/",
        publicKey: process.env.VAPID_PUBLIC_KEY || '',
        privateKey: process.env.VAPID_PRIVATE_KEY || ''
    };
    const options = {
        TTL: 60
    };
    try {
        subscriptions.forEach(async (subscription: any) => {
            console.log('Sending notification to:', subscription.endpoint);
            webpush.setVapidDetails(
                vapidDetails.subject,
                vapidDetails.publicKey,
                vapidDetails.privateKey
            );
            await webpush.sendNotification(subscription, payload, options);
            console.log('Notification sent to:', subscription.endpoint);
        });
        res.sendStatus(200);
    } catch (e) {
        console.error('Error sending notification:', e);
        res.json({ error: "Server Error" });
        res.sendStatus(500);
    }
}