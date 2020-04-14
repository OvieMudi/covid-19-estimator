import xml2js from 'xml2js';
import appRoot from 'app-root-path';
import estimator from '../../estimator';

const toXML = new xml2js.Builder({ headless: true });


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
  res.setHeader('Content-Type', 'text/plain');
  return res.sendFile(`${appRoot}/src/log/request.txt`);
};

export { estimatorJsonController, estimatorXMLController, logController };
