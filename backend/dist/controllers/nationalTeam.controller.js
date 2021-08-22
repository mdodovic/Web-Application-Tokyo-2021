"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NationalTeamController = void 0;
const nationalTeam_1 = __importDefault(require("../models/nationalTeam"));
const nationalTeam_2 = __importDefault(require("../models/nationalTeam"));
class NationalTeamController {
    constructor() {
        this.addNationalTeamScratch = (req, res) => {
            console.log(req.body.nationality);
            let nationalTeam = new nationalTeam_2.default(req.body);
            console.log(nationalTeam);
            nationalTeam.save().then(nationalTeam => { res.json({ 'nationalTeam added': 'ok' }); }).catch(err => { res.json(err); });
        };
        this.addPlayerToDiscipline = (req, res) => {
            console.log(req.body);
            nationalTeam_1.default.collection.updateOne({
                "nationality": req.body.nationality,
                "sportName": req.body.sportName,
                "disciplineName": req.body.disciplineName,
                "gender": req.body.gender,
                "single": req.body.single
            }, {
                $push: { "players": req.body.player }
            });
            nationalTeam_1.default.collection.updateOne({
                "nationality": req.body.nationality,
                "sportName": req.body.sportName,
                "disciplineName": req.body.disciplineName,
                "gender": req.body.gender,
                "single": req.body.single
            }, {
                $set: { "accepted": true }
            });
            res.json({ "added player to sport-discipline": "OK" });
        };
    }
}
exports.NationalTeamController = NationalTeamController;
{
}
//# sourceMappingURL=nationalTeam.controller.js.map