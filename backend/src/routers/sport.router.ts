import express from 'express';
import { SportController } from '../controllers/sport.controller';

const sportRouter = express.Router();

sportRouter.route('/fetchAllSports').get(
    (req, res) => new SportController().fetchAllSports(req, res)
);

sportRouter.route('/acceptSport').post(
    (req, res) => new SportController().acceptSport(req, res)
);



export default sportRouter;

