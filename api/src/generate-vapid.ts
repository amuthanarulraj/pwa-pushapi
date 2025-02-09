import webpush from 'web-push';
import * as fs from 'fs';
import * as path from 'path';

const vapidKeys = webpush.generateVAPIDKeys();
const envFilePath = path.resolve(__dirname, './../.env');
let envFileContent = '';
if (fs.existsSync(envFilePath)) {
    envFileContent = fs.readFileSync(envFilePath, 'utf8');
} else {
    fs.writeFileSync(envFilePath, '');
}
envFileContent = envFileContent.replace(/VAPID_PUBLIC_KEY=.*/g, `VAPID_PUBLIC_KEY=${vapidKeys.publicKey}`);
envFileContent = envFileContent.replace(/VAPID_PRIVATE_KEY=.*/g, `VAPID_PRIVATE_KEY=${vapidKeys.privateKey}`);

if (!envFileContent.includes('VAPID_PUBLIC_KEY')) {
    envFileContent += `\nVAPID_PUBLIC_KEY=${vapidKeys.publicKey}`;
}
if (!envFileContent.includes('VAPID_PRIVATE_KEY')) {
    envFileContent += `\nVAPID_PRIVATE_KEY=${vapidKeys.privateKey}`;
}
fs.writeFileSync(envFilePath, envFileContent.trim());