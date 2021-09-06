import express from 'express';
import { NationalTeamController } from '../controllers/nationalTeam.controller';

const nationalTeamRouter = express.Router();

nationalTeamRouter.route('/addNationalTeamScratch').post(
    (req, res) => new NationalTeamController().addNationalTeamScratch(req, res)
);

nationalTeamRouter.route('/addPlayerToDiscipline').post(
    (req, res) => new NationalTeamController().addPlayerToDiscipline(req, res)
);

nationalTeamRouter.route('/fetchBySportDisciplineAndGender').post(
    (req, res) => new NationalTeamController().fetchBySportDisciplineAndGender(req, res)
);



export default nationalTeamRouter;



