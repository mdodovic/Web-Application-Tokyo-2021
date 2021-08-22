"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.fetchByUsername = (req, res) => {
            let username = req.body.username;
            console.log(username);
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.fetchByTypeAndCountry = (req, res) => {
            let type = req.body.type;
            let counrty = req.body.country;
            console.log(type);
            console.log(counrty);
            user_1.default.findOne({ 'type': type, 'nationality': counrty, 'accepted': 1 }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.addUser = (req, res) => {
            let user = new user_1.default(req.body);
            console.log(user);
            user.save().then(user => { res.json({ 'user added': 'ok' }); }).catch(err => { res.json(err); });
        };
        this.changePasswordByUsername = (req, res) => {
            let username = req.body.username;
            let newPassword = req.body.newPassword;
            console.log(username);
            console.log(newPassword);
            user_1.default.collection.updateOne({ 'username': username }, { $set: { 'password': newPassword } });
            res.json({ 'password changed': 'ok' });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map