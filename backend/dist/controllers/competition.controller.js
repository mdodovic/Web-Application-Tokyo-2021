"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitionController = void 0;
const competition_1 = __importDefault(require("../models/competition"));
class CompetitionController {
    constructor() {
        this.fetchAllCompetitions = (req, res) => {
            competition_1.default.find({}, (err, competitions) => {
                if (err)
                    console.log(err);
                else {
                    console.log(competitions);
                    res.json(competitions);
                }
            });
        };
        this.addCompetition = (req, res) => {
            let competition = new competition_1.default(req.body);
            console.log(competition);
            competition.save().then(competition => { res.json({ 'competition added': 'ok' }); }).catch(err => { res.json(err); });
        };
        this.fetchByDelegate = (req, res) => {
            console.log(req.body);
            competition_1.default.find({ "delegate": req.body.delegateUsername }, (err, competitions) => {
                if (err)
                    console.log(err);
                else {
                    console.log(competitions);
                    res.json(competitions);
                }
            });
        };
    }
}
exports.CompetitionController = CompetitionController;
//# sourceMappingURL=competition.controller.js.map