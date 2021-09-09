import express from "express";
import Timetable from "../models/timetable";

export class TimetableController {

    addTimetable = (req: express.Request, res: express.Response) => {
        let timetable = new Timetable(req.body);
        console.log(timetable);
        timetable.save().then(timetable => { res.json({ 'timetable added': 'ok' }) }).catch(err => { res.json(err) })
    }

    fetchByLocationAndDatetime = (req: express.Request, res: express.Response) => {
        console.log(req.body)
        Timetable.findOne({
            'location': req.body.location,
            'datetime': req.body.datetime
        },
            (err, timetable) => {
                if (err) console.log(err);
                else res.json(timetable);
            }
        )

    }

    fetchAllTimetables = (req: express.Request, res: express.Response) => {
        Timetable.find({}, (err, timetables) => {
            if (err) console.log(err);
            else {
                console.log(timetables);
                res.json(timetables);
            }
        })
    }

    fetchBySportDisciplineAndGender = (req: express.Request, res: express.Response) => {
        console.log(req.body)
        Timetable.find({
            'sportName': req.body.sportName,
            'disciplineName': req.body.disciplineName,
            'gender': req.body.gender
        },
            (err, timetable) => {
                if (err) console.log(err);
                else res.json(timetable);
            }
        )

    }

}