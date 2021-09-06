"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/fetchByUsername').post((req, res) => new user_controller_1.UserController().fetchByUsername(req, res));
userRouter.route('/fetchByTypeAndCountry').post((req, res) => new user_controller_1.UserController().fetchByTypeAndCountry(req, res));
userRouter.route('/addUser').post((req, res) => new user_controller_1.UserController().addUser(req, res));
userRouter.route('/changePasswordByUsername').post((req, res) => new user_controller_1.UserController().changePasswordByUsername(req, res));
userRouter.route('/fetchByType').post((req, res) => new user_controller_1.UserController().fetchByType(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map