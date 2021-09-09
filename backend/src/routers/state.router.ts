import express from 'express';
import { StateController } from '../controllers/state.controller';

const stateRouter = express.Router();

stateRouter.route('/addMedal').post(
    (req, res) => new StateController().addMedal(req, res)
);

stateRouter.route('/fetchAllStates').get(
    (req, res) => new StateController().fetchAllStates(req, res)
);


export default stateRouter;

