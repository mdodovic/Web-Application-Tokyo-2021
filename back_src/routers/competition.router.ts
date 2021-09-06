

import express from 'express';
import { CompetitionController } from '../controllers/competition.controller';

const competitionRouter = express.Router();


competitionRouter.route('/addCompetition').post(
    (req, res) => new CompetitionController().addCompetition(req, res)
);

competitionRouter.route('/fetchAllCompetitions').get(
    (req, res) => new CompetitionController().fetchAllCompetitions(req, res)
);

competitionRouter.route('/fetchByDelegate').post(
    (req, res) => new CompetitionController().fetchByDelegate(req, res)
);

competitionRouter.route('/finishCompetition').post(
    (req, res) => new CompetitionController().finishCompetition(req, res)
);

competitionRouter.route('/fetchAllFinishedCompetitions').get(
    (req, res) => new CompetitionController().fetchAllFinishedCompetitions(req, res)
);


export default competitionRouter;