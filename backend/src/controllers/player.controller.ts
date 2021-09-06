import express from "express";
import Player from "../models/player";

export class PlayerController {


    fetchByFirstnameAndLastname = (req: express.Request, res: express.Response) => {
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        console.log(firstname);
        console.log(lastname);

        Player.findOne({ 'firstname': firstname, 'lastname': lastname },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            }
        )
    }

    addPlayer = (req: express.Request, res: express.Response) => {
        let player = new Player(req.body);
        console.log(player);
        player.save().then(player => { res.json({ 'player added': 'ok' }) }).catch(err => { res.json(err) })
    }

    addDisciplineToPlayer = (req: express.Request, res: express.Response) => {
        console.log(req.body)

        Player.collection.updateOne(
            {
                'firstname': req.body.firstname,
                'lastname': req.body.lastname,

            },
            {
                $push: { "disciplines": req.body.disciplineName }
            }
        );
        res.json({ "added sport-discipline to player": "OK" });
    }

    fetchByNationalitySportDisciplineAndGender = (req: express.Request, res: express.Response) => {

        console.log(req.body)
        console.log(req.body.discipline)

        if (req.body.discipline == null) {
            Player.find({
                'nationality': req.body.nationality,
                'sportName': req.body.sportName,
                'gender': req.body.gender
            },
                (err, user) => {
                    if (err) console.log(err);
                    else res.json(user);
                }
            )
        } else {
            Player.find({
                'nationality': req.body.nationality,
                'sportName': req.body.sportName,
                'gender': req.body.gender,
                'disciplines': { "$in": [req.body.discipline] }
            },
                (err, user) => {
                    if (err) console.log(err);
                    else res.json(user);
                }
            )
        }

    }

    removePlayer = (req: express.Request, res: express.Response) => {
        console.log(req.body);
        Player.collection.deleteOne({ 'firstname': req.body.firstname, 'lastname': req.body.lastname })
        res.json({ 'removed player': 'ok' })
    }

    removeDisciplineFromPlayer = (req: express.Request, res: express.Response) => {
        console.log(req.body)

        Player.collection.updateOne(
            {
                'firstname': req.body.firstname,
                'lastname': req.body.lastname,
            },
            {
                $pull: { "disciplines": req.body.disciplineName }
            }
        );
        Player.findOne({ 'firstname': req.body.firstname, 'lastname': req.body.lastname },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            }
        )

    }

    fetchByNationality = (req: express.Request, res: express.Response) => {

        console.log(req.body)
        Player.find({ 'nationality': req.body.nationality },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            }
        )
    }

    addMedal = (req: express.Request, res: express.Response) => {

        let medal: string = req.body.medal;
        console.log(req.body);
        if (medal == "goldMedals") {
            Player.collection.updateOne(
                {
                    'firstname': req.body.firstname,
                    'lastname': req.body.lastname,

                },
                {
                    $push: { "goldMedals": req.body.competitionName }
                }
            );
            res.json({ "added medal to player": "OK" });
        } else if (medal == "silverMedals") {
            Player.collection.updateOne(
                {
                    'firstname': req.body.firstname,
                    'lastname': req.body.lastname,

                },
                {
                    $push: { "silverMedals": req.body.competitionName }
                }
            );
            res.json({ "added medal to player": "OK" });
        } else {
            Player.collection.updateOne(
                {
                    'firstname': req.body.firstname,
                    'lastname': req.body.lastname,

                },
                {
                    $push: { "bronseMedals": req.body.competitionName }
                }
            );
            res.json({ "added medal to player": "OK" });
        }

    }

}
