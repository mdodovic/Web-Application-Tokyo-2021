import express from "express";
import Round from "../models/round";

export class RoundController {

    fetchBySportDisciplineGenderAndType = (req: express.Request, res: express.Response) => {
        console.log(req.body)
        Round.find({
            'sportName': req.body.sportName,
            'disciplineName': req.body.disciplineName,
            'gender': req.body.gender,
            'roundType': req.body.roundType
        },
            (err, round) => {
                if (err) console.log(err);
                else res.json(round);
            }
        )

    }

    addRound = (req: express.Request, res: express.Response) => {
        let round = new Round(req.body);
        console.log(round);
        round.save().then(round => { res.json({ 'round added': 'ok' }) }).catch(err => { res.json(err) })
    }
}
