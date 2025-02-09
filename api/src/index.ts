import express from 'express';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import dotenv from 'dotenv';
import { getVapidPublicKey } from './controllers/vapid-controller';
import { register } from './controllers/push-controller';
import { sendMessage } from './controllers/message-controller';

dotenv.config();
const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());
app.get('/vapidPublicKey', getVapidPublicKey);
app.post('/pushregistrations', register);
app.post('/messages', sendMessage);

const key = fs.readFileSync('./../certs/localhost.key');
const cert = fs.readFileSync('./../certs/localhost.crt');

// Create an HTTPS server
const server = https.createServer({
  key: key,
  cert: cert
}, app);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});