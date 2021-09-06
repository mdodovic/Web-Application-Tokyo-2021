"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const timetable_controller_1 = require("../controllers/timetable.controller");
const timetableRouter = express_1.default.Router();
timetableRouter.route('/addTimetable').post((req, res) => new timetable_controller_1.TimetableController().addTimetable(req, res));
timetableRouter.route('/fetchByLocationAndDatetime').post((req, res) => new timetable_controller_1.TimetableController().fetchByLocationAndDatetime(req, res));
timetableRouter.route('/fetchAllTimetables').get((req, res) => new timetable_controller_1.TimetableController().fetchAllTimetables(req, res));
timetableRouter.route('/fetchBySportDisciplineAndGender').post((req, res) => new timetable_controller_1.TimetableController().fetchBySportDisciplineAndGender(req, res));
exports.default = timetableRouter;
//# sourceMappingURL=timetable.router.js.map