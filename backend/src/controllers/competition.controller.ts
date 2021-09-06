import express from "express";
import Competition from "../models/competition";

export class CompetitionController {

    fetchAllCompetitions = (req: express.Request, res: express.Response) => {
        Competition.find({}, (err, competitions) => {
            if (err) console.log(err);
            else {
                console.log(competitions);
                res.json(competitions);
            }
        })
    }

    addCompetition = (req: express.Request, res: express.Response) => {
        let competition = new Competition(req.body);
        console.log(competition);
        competition.save().then(competition => { res.json({ 'competition added': 'ok' }) }).catch(err => { res.json(err) })
    }

    fetchByDelegate = (req: express.Request, res: express.Response) => {
        console.log(req.body)
        Competition.find({ "delegate": req.body.delegateUsername }, (err, competitions) => {
            if (err) console.log(err);
            else {
                console.log(competitions);
                res.json(competitions);
            }
        })
    }

}