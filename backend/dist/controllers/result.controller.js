"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultController = void 0;
const result_1 = __importDefault(require("../models/result"));
class ResultController {
    constructor() {
        this.addResultScratch = (req, res) => {
            let result = new result_1.default(req.body);
            console.log(result);
            result.save().then(result => { res.json({ 'result scratch added': 'ok' }); }).catch(err => { res.json(err); });
        };
        this.fetchBySportDisciplineAndGender = (req, res) => {
            console.log(req.body);
            result_1.default.findOne({
                'sportName': req.body.sportName,
                'disciplineName': req.body.disciplineName,
                'gender': req.body.gender
            }, (err, result) => {
                if (err)
                    console.log(err);
                else
                    res.json(result);
            });
        };
        this.replaceFinalResultList = (req, res) => {
            result_1.default.collection.updateOne({
                'sportName': req.body.sportName,
                'disciplineName': req.body.disciplineName,
                'gender': req.body.gender
            }, {
                $set: { 'final': req.body.final }
            });
            res.json({ 'final result changed': 'ok' });
        };
    }
}
exports.ResultController = ResultController;
//# sourceMappingURL=result.controller.js.map