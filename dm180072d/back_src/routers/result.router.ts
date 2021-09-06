

import express from 'express';
import { ResultController } from '../controllers/result.controller';

const resultRouter = express.Router();

resultRouter.route('/addResultScratch').post(
    (req, res) => new ResultController().addResultScratch(req, res)
);


resultRouter.route('/fetchBySportDisciplineAndGender').post(
    (req, res) => new ResultController().fetchBySportDisciplineAndGender(req, res)
);

resultRouter.route('/replaceFinalResultList').post(
    (req, res) => new ResultController().replaceFinalResultList(req, res)
);

resultRouter.route('/addTreeScoreByIndex').post(
    (req, res) => new ResultController().addTreeScoreByIndex(req, res)
);

resultRouter.route('/addTreeScratch').post(
    (req, res) => new ResultController().addTreeScratch(req, res)
);

resultRouter.route('/postponeEnteringFinalTimetable').post(
    (req, res) => new ResultController().postponeEnteringFinalTimetable(req, res)
);

resultRouter.route('/addTreeToGroupResultCompetition').post(
    (req, res) => new ResultController().addTreeToGroupResultCompetition(req, res)
);

resultRouter.route('/addPointsAndScoreToRepresentation').post(
    (req, res) => new ResultController().addPointsAndScoreToRepresentation(req, res)
);

resultRouter.route('/finishGroupPhase').post(
    (req, res) => new ResultController().finishGroupPhase(req, res)
);

resultRouter.route('/addRepresentationsToTree').post(
    (req, res) => new ResultController().addRepresentationsToTree(req, res)
);

export default resultRouter;

