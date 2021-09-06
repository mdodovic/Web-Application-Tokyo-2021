

import express from 'express';
import { RoundController } from '../controllers/round.controller';

const roundRouter = express.Router();

roundRouter.route('/fetchBySportDisciplineGenderAndType').post(
    (req, res) => new RoundController().fetchBySportDisciplineGenderAndType(req, res)
);

roundRouter.route('/addRound').post(
    (req, res) => new RoundController().addRound(req, res)
);

export default roundRouter;

