"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const competition_controller_1 = require("../controllers/competition.controller");
const competitionRouter = express_1.default.Router();
competitionRouter.route('/addCompetition').post((req, res) => new competition_controller_1.CompetitionController().addCompetition(req, res));
competitionRouter.route('/fetchAllCompetitions').get((req, res) => new competition_controller_1.CompetitionController().fetchAllCompetitions(req, res));
competitionRouter.route('/fetchByDelegate').post((req, res) => new competition_controller_1.CompetitionController().fetchByDelegate(req, res));
exports.default = competitionRouter;
//# sourceMappingURL=competition.router.js.map