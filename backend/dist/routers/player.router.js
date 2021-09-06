"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const player_controller_1 = require("../controllers/player.controller");
const playerRouter = express_1.default.Router();
playerRouter.route('/fetchByFirstnameAndLastname').post((req, res) => new player_controller_1.PlayerController().fetchByFirstnameAndLastname(req, res));
playerRouter.route('/addPlayer').post((req, res) => new player_controller_1.PlayerController().addPlayer(req, res));
playerRouter.route('/addDisciplineToPlayer').post((req, res) => new player_controller_1.PlayerController().addDisciplineToPlayer(req, res));
playerRouter.route('/fetchByNationalitySportDisciplineAndGender').post((req, res) => new player_controller_1.PlayerController().fetchByNationalitySportDisciplineAndGender(req, res));
playerRouter.route('/removePlayer').post((req, res) => new player_controller_1.PlayerController().removePlayer(req, res));
playerRouter.route('/removeDisciplineFromPlayer').post((req, res) => new player_controller_1.PlayerController().removeDisciplineFromPlayer(req, res));
playerRouter.route('/fetchByNationality').post((req, res) => new player_controller_1.PlayerController().fetchByNationality(req, res));
playerRouter.route('/addMedal').post((req, res) => new player_controller_1.PlayerController().addMedal(req, res));
exports.default = playerRouter;
//# sourceMappingURL=player.router.js.map