import express from 'express';
import { PlayerController } from '../controllers/player.controller';

const playerRouter = express.Router();

playerRouter.route('/fetchByFirstnameAndLastname').post(
    (req, res) => new PlayerController().fetchByFirstnameAndLastname(req, res)
);

playerRouter.route('/addPlayer').post(
    (req, res) => new PlayerController().addPlayer(req, res)
);

playerRouter.route('/addDisciplineToPlayer').post(
    (req, res) => new PlayerController().addDisciplineToPlayer(req, res)
);

playerRouter.route('/fetchByNationalitySportDisciplineAndGender').post(
    (req, res) => new PlayerController().fetchByNationalitySportDisciplineAndGender(req, res)
);

playerRouter.route('/removePlayer').post(
    (req, res) => new PlayerController().removePlayer(req, res)
);

playerRouter.route('/removeDisciplineFromPlayer').post(
    (req, res) => new PlayerController().removeDisciplineFromPlayer(req, res)
);

playerRouter.route('/fetchByNationality').post(
    (req, res) => new PlayerController().fetchByNationality(req, res)
);

playerRouter.route('/addMedal').post(
    (req, res) => new PlayerController().addMedal(req, res)
);


export default playerRouter;
