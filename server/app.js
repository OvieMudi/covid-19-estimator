import fs from 'fs';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import appRoot from 'app-root-path';
import onCovidRouter from './routes';


dotenv.config();

const app = express();

const accessLogStream = fs.createWriteStream(path.join(`${appRoot}/server/logs`, 'request.log'), { flags: 'a' });
const format = '{"method":":method", "url":":url", "status"::status, "responseTime":":response-time"}';

app.use(morgan(format, { stream: accessLogStream }));
app.use(express.json());
app.use('/api/v1', onCovidRouter);
app.disable('x-powered-by');


const PORT = process.env.PORT || 3000;

app.all('*', (req, res) => {
  res.send({
    message: 'Hello! Kindly make POST request to /api/v1/on-covid-19'
  });
});

app.listen(PORT, () => {
  console.log(`LISTENING ON ${PORT}`);
});