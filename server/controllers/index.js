
import { readFileSync } from 'fs';
import xml2js from 'xml2js';
import root from '../../root';
import estimator from '../../src/estimator';

const toXML = new xml2js.Builder();


const estimatorJsonController = (req, res) => {
  const estimate = estimator(req.body);
  res.status(200).json(estimate);
};

const estimatorXMLController = (req, res) => {
  const estimate = estimator(req.body);

  const XMLString = toXML.buildObject(estimate);

  res.setHeader('Content-Type', 'application/xml');

  res.status(200).send(XMLString);
};


const logController = (req, res) => {
  let parsedLog = '';

  const logs = readFileSync(`${root.appRootDir}/server/logs/request.log`, 'utf8').split('\n');

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
