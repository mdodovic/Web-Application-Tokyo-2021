"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimetableController = void 0;
const timetable_1 = __importDefault(require("../models/timetable"));
class TimetableController {
    constructor() {
        this.addTimetable = (req, res) => {
            let timetable = new timetable_1.default(req.body);
            console.log(timetable);
            timetable.save().then(timetable => { res.json({ 'timetable added': 'ok' }); }).catch(err => { res.json(err); });
        };
        this.fetchByLocationAndDatetime = (req, res) => {
            console.log(req.body);
            timetable_1.default.findOne({
                'location': req.body.location,
                'datetime': req.body.datetime
            }, (err, timetable) => {
                if (err)
                    console.log(err);
                else
                    res.json(timetable);
            });
        };
        this.fetchAllTimetables = (req, res) => {
            timetable_1.default.find({}, (err, timetables) => {
                if (err)
                    console.log(err);
                else {
                    console.log(timetables);
                    res.json(timetables);
                }
            });
        };
        this.fetchBySportDisciplineAndGender = (req, res) => {
            console.log(req.body);
            timetable_1.default.find({
                'sportName': req.body.sportName,
                'disciplineName': req.body.disciplineName,
                'gender': req.body.gender
            }, (err, timetable) => {
                if (err)
                    console.log(err);
                else
                    res.json(timetable);
            });
        };
    }
}
exports.TimetableController = TimetableController;
//# sourceMappingURL=timetable.controller.js.map