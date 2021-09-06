import express from "express";
import Result from "../models/result";

export class ResultController {

    addResultScratch = (req: express.Request, res: express.Response) => {
        let result = new Result(req.body);
        console.log(result);
        result.save().then(result => { res.json({ 'result scratch added': 'ok' }) }).catch(err => { res.json(err) })
    }

    fetchBySportDisciplineAndGender = (req: express.Request, res: express.Response) => {
        console.log(req.body)
        Result.findOne({
            'sportName': req.body.sportName,
            'disciplineName': req.body.disciplineName,
            'gender': req.body.gender
        },
            (err, result) => {
                if (err) console.log(err);
                else res.json(result);
            }
        )

    }

    replaceFinalResultList = (req: express.Request, res: express.Response) => {
        Result.collection.updateOne({
            'sportName': req.body.sportName,
            'disciplineName': req.body.disciplineName,
            'gender': req.body.gender
        }, {
            $set: { 'final': req.body.final }
        });
        res.json({ 'final result changed': 'ok' });
    }

    addTreeScoreByIndex = (req: express.Request, res: express.Response) => {

        Result.collection.updateOne({ 'tree.$.index': req.body.index },
            {
                $set: { 'tree.$.score': req.body.score }
            });

        res.json({ 'sport added': 'ok' });

    }





    addTreeScratch = (req: express.Request, res: express.Response) => {
        let user = new User(req.body);
        console.log(user);
        user.save().then(user => { res.json({ 'user added': 'ok' }) }).catch(err => { res.json(err) })
    }
}