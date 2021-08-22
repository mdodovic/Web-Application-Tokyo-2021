"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportController = void 0;
const sport_1 = __importDefault(require("../models/sport"));
class SportController {
    constructor() {
        this.fetchAllSports = (req, res) => {
            sport_1.default.find({}, (err, sports) => {
                if (err)
                    console.log(err);
                else {
                    console.log(sports);
                    res.json(sports);
                }
            });
        };
        this.acceptSport = (req, res) => {
            let sportName = req.body.sportName;
            let disciplineName = req.body.disciplineName;
            console.log(sportName);
            console.log(disciplineName);
            sport_1.default.collection.updateOne({ 'name': sportName, "disciplines.disciplineName": disciplineName }, {
                $set: { 'disciplines.$.accepted': true }
            });
            res.json({ 'sport added': 'ok' });
        };
    }
}
exports.SportController = SportController;
//# sourceMappingURL=sport.controller.js.map