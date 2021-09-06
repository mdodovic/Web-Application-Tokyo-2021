"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nationalTeam_controller_1 = require("../controllers/nationalTeam.controller");
const nationalTeamRouter = express_1.default.Router();
nationalTeamRouter.route('/addNationalTeamScratch').post((req, res) => new nationalTeam_controller_1.NationalTeamController().addNationalTeamScratch(req, res));
nationalTeamRouter.route('/addPlayerToDiscipline').post((req, res) => new nationalTeam_controller_1.NationalTeamController().addPlayerToDiscipline(req, res));
nationalTeamRouter.route('/fetchBySportDisciplineAndGender').post((req, res) => new nationalTeam_controller_1.NationalTeamController().fetchBySportDisciplineAndGender(req, res));
exports.default = nationalTeamRouter;
//# sourceMappingURL=nationalTeam.router.js.map