import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/fetchByUsername').post(
    (req, res) => new UserController().fetchByUsername(req, res)
);

userRouter.route('/fetchByTypeAndCountry').post(
    (req, res) => new UserController().fetchByTypeAndCountry(req, res)
);

userRouter.route('/addUser').post(
    (req, res) => new UserController().addUser(req, res)
);

userRouter.route('/changePasswordByUsername').post(
    (req, res) => new UserController().changePasswordByUsername(req, res)
);

userRouter.route('/fetchByType').post(
    (req, res) => new UserController().fetchByType(req, res)
);



export default userRouter;