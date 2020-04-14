
import { readFileSync } from 'fs';
import xml2js from 'xml2js';
import appRoot from 'app-root-path';
import estimator from '../../estimator';

const toXML = new xml2js.Builder();


const estimatorJsonController = (req, res) => {
  console.log('estimatorJsonController -> req.body', req.body);

  const estimate = estimator(req.body);
  res.status(200).json(estimate);
};

const estimatorXMLController = (req, res) => {
  console.log('estimatorXMLController -> req.body', req.body);
  const estimate = estimator(req.body);

  const XMLString = toXML.buildObject(estimate);

  res.setHeader('Content-Type', 'application/xml');

  res.status(200).send(XMLString);
};


const logController = (req, res) => {
  console.log('logController -> req.body', req.body);
  let parsedLog = '';

  const logs = readFileSync(`${appRoot}/src/log/request.txt`, 'utf8').split('\n');

  let logLine = {};

  logs.forEach((line) => {
    if (line.includes('method')) {
      logLine = JSON.parse(line);
      parsedLog += `${logLine.method} ${logLine.url} ${logLine.status} ${Math.ceil(Number(logLine.responseTime))}ms\n`;
    }
  });

  return res.send(parsedLog);
};

export { estimatorJsonController, estimatorXMLController, logController };
