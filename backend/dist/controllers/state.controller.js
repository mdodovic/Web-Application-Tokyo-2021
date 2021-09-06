"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateController = void 0;
const state_1 = __importDefault(require("../models/state"));
class StateController {
    constructor() {
        this.addMedal = (req, res) => {
            console.log(req.body);
            if (req.body.medal == "goldMedals") {
                state_1.default.collection.updateOne({ 'countryName': req.body.countryName }, { $inc: { 'goldMedals': 1 } });
            }
            else if (req.body.medal == "silverMedals") {
                state_1.default.collection.updateOne({ 'countryName': req.body.countryName }, { $inc: { 'silverMedals': 1 } });
            }
            else {
                state_1.default.collection.updateOne({ 'countryName': req.body.countryName }, { $inc: { 'bronseMedals': 1 } });
            }
            res.json({ 'added medal to the state': 'ok' });
        };
    }
}
exports.StateController = StateController;
//# sourceMappingURL=state.controller.js.map