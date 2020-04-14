import express from 'express';
import { estimatorJsonController, estimatorXMLController, logController } from '../controllers';

const onCovidRouter = express.Router();

const route = '/on-covid-19';

onCovidRouter.get(`${route}/logs`, logController);

onCovidRouter.post(route, estimatorJsonController);

onCovidRouter.post(`${route}/json`, estimatorJsonController);

onCovidRouter.post(`${route}/xml`, estimatorXMLController);


export default onCovidRouter;
