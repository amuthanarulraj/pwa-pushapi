import express from 'express';
// import fs from 'fs';
// import https from 'https';
import { getVapidPublicKey } from './controllers/vapid-controller';
import { register } from './controllers/push-controller';
import { sendMessage } from './controllers/message-controller';

const app = express();
const port = 3002;

app.get('/vapidPublicKey', getVapidPublicKey);
app.post('/pushregistrations', register);
app.post('/messages', sendMessage);

// const key = fs.readFileSync('./certs/localhost-key.pem');
// const cert = fs.readFileSync('./certs/localhost.pem');

// Create an HTTPS server
// const server = https.createServer({
//   key: key,
//   cert: cert
// }, app);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});