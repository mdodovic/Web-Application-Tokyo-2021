import express from "express";
import nationalTeam from "../models/nationalTeam";
import NationalTeam from "../models/nationalTeam";

export class NationalTeamController {

    addNationalTeamScratch = (req: express.Request, res: express.Response) => {
        console.log(req.body.nationality)
        let nationalTeam = new NationalTeam(req.body);
        console.log(nationalTeam);
        nationalTeam.save().then(nationalTeam => { res.json({ 'nationalTeam added': 'ok' }) }).catch(err => { res.json(err) })
    }

    addPlayerToDiscipline = (req: express.Request, res: express.Response) => {
        console.log(req.body)

        nationalTeam.collection.updateOne(
            {
                "nationality": req.body.nationality,
                "sportName": req.body.sportName,
                "disciplineName": req.body.disciplineName,
                "gender": req.body.gender,
                "single": req.body.single
            },
            {
                $push: { "players": req.body.player }
            }
        );

        nationalTeam.collection.updateOne(
            {
                "nationality": req.body.nationality,
                "sportName": req.body.sportName,
                "disciplineName": req.body.disciplineName,
                "gender": req.body.gender,
                "single": req.body.single
            },
            {
                $set: { "accepted": true }
            }
        );

        res.json({ "added player to sport-discipline": "OK" });

    }


    fetchBySportDisciplineAndGender = (req: express.Request, res: express.Response) => {

        nationalTeam.find({
            'sportName': req.body.sportName,
            'disciplineName': req.body.disciplineName,
            'gender': req.body.gender,
            'accepted': true
        },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })
    }

}

