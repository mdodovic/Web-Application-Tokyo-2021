"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const state_controller_1 = require("../controllers/state.controller");
const stateRouter = express_1.default.Router();
stateRouter.route('/addMedal').post((req, res) => new state_controller_1.StateController().addMedal(req, res));
exports.default = stateRouter;
//# sourceMappingURL=state.router.js.map