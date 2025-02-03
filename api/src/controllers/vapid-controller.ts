import webpush from 'web-push';
import { Request, Response } from 'express';

const setVapidDetails = () => {
    if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
        const keys = webpush.generateVAPIDKeys();
        process.env.VAPID_PUBLIC_KEY = keys.publicKey;
        process.env.VAPID_PRIVATE_KEY = keys.privateKey;
    }
    webpush.setVapidDetails(
        "https://github.com/",
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
    );
};

export const getVapidPublicKey = (req: Request, res: Response) => {
    console.log("VAPID_PUBLIC_KEY:", process.env.VAPID_PUBLIC_KEY);
    setVapidDetails();
    console.log("VAPID key set");
    res.send(process.env.VAPID_PUBLIC_KEY);
}