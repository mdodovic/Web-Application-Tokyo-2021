import express from 'express';
import { GroupController } from '../controllers/group.controller';

const groupRouter = express.Router();

groupRouter.route('/addGroup').post(
    (req, res) => new GroupController().addGroup(req, res)
);


groupRouter.route('/fetchBySportAndGender').post(
    (req, res) => new GroupController().fetchBySportAndGender(req, res)
);


groupRouter.route('/addPointsToGroupMatch').post(
    (req, res) => new GroupController().addPointsToGroupMatch(req, res)
);


export default groupRouter;
