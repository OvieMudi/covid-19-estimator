import fs from 'fs';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import appRoot from 'app-root-path';
import cors from 'cors';
import onCovidRouter from './routes';


dotenv.config();

const app = express();

const accessLogStream = fs.createWriteStream(`${appRoot}/src/log/request.txt`, { flags: 'a' });
const format = ':method\t\t:url\t\t:status\t\t0:response-time[0]ms';

app.use(morgan(format, { stream: accessLogStream }));
app.use(express.json());
app.use(cors());
app.use('/api/v1', onCovidRouter);


const PORT = process.env.PORT || 3100;

app.all('*', (req, res) => {
  res.send({
    message: 'Hello! Kindly make POST request to /api/v1/on-covid-19'
  });
});

app.listen(PORT, () => {
  console.log(`LISTENING ON ${PORT}`);
});
