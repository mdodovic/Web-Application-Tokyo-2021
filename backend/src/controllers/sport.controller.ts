import express from "express";
import Sport from "../models/sport";


export class SportController {

    fetchAllSports = (req: express.Request, res: express.Response) => {
        Sport.find({
            'disciplines.accepted': true
        }, (err, sports) => {
            if (err) console.log(err);
            else {
                console.log(sports);
                res.json(sports);
            }
        })
    }

    fetchAllSportsForConfirmation = (req: express.Request, res: express.Response) => {
        Sport.find({}, (err, sports) => {
            if (err) console.log(err);
            else {
                console.log(sports);
                res.json(sports);
            }
        })
    }

    acceptSport = (req: express.Request, res: express.Response) => {
        let sportName = req.body.sportName;
        let disciplineName = req.body.disciplineName;
        console.log(sportName);
        console.log(disciplineName);


        Sport.collection.updateOne({ 'name': sportName, "disciplines.disciplineName": disciplineName },
            {
                $set: { 'disciplines.$.accepted': true }
            });

        res.json({ 'sport added': 'ok' });


    }


}