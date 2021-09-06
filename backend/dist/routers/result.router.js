"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const result_controller_1 = require("../controllers/result.controller");
const resultRouter = express_1.default.Router();
resultRouter.route('/addResultScratch').post((req, res) => new result_controller_1.ResultController().addResultScratch(req, res));
resultRouter.route('/fetchBySportDisciplineAndGender').post((req, res) => new result_controller_1.ResultController().fetchBySportDisciplineAndGender(req, res));
resultRouter.route('/replaceFinalResultList').post((req, res) => new result_controller_1.ResultController().replaceFinalResultList(req, res));
exports.default = resultRouter;
//# sourceMappingURL=result.router.js.map