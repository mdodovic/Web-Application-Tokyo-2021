import express from 'express';
import { TimetableController } from '../controllers/timetable.controller';

const timetableRouter = express.Router();

timetableRouter.route('/addTimetable').post(
    (req, res) => new TimetableController().addTimetable(req, res)
);

timetableRouter.route('/fetchByLocationAndDatetime').post(
    (req, res) => new TimetableController().fetchByLocationAndDatetime(req, res)
);


timetableRouter.route('/fetchAllTimetables').get(
    (req, res) => new TimetableController().fetchAllTimetables(req, res)
);


timetableRouter.route('/fetchBySportDisciplineAndGender').post(
    (req, res) => new TimetableController().fetchBySportDisciplineAndGender(req, res)
);


export default timetableRouter;

