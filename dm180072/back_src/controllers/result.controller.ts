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
        console.log("UPDATE!");
        console.log(req.body)
        Result.collection.updateOne(
            {
                'sportName': req.body.sportName,
                'disciplineName': req.body.disciplineName,
                'gender': req.body.gender,
                'tree.index': req.body.index
            },
            {
                $set: { 'tree.$.score': req.body.score }
            });

        res.json({ 'result added to tree': 'ok' });

    }


    addTreeScratch = (req: express.Request, res: express.Response) => {
        console.log(req.body)
        Result.collection.updateOne(
            {
                'sportName': req.body.sportName,
                'disciplineName': req.body.disciplineName,
                'gender': req.body.gender
            },
            {
                $push: { "tree": req.body.treeScratch }
            }
        );

        res.json({ "added scratch to tree": "OK" });
    }

    postponeEnteringFinalTimetable = (req: express.Request, res: express.Response) => {
        Result.collection.updateOne(
            {
                'sportName': req.body.sportName,
                'disciplineName': req.body.disciplineName,
                'gender': req.body.gender,
            },
            {
                $set: {
                    'timetabledEndCompetition': req.body.timetabledEndCompetition,
                    'groupPhaseFinished': req.body.groupPhaseFinished
                }
            });

        res.json({ 'timetabledEndCompetition udated on': req.body.timetabledEndCompetition });

    }

    addTreeToGroupResultCompetition = (req: express.Request, res: express.Response) => {
        Result.collection.updateOne(
            {
                'sportName': req.body.sportName,
                'disciplineName': req.body.disciplineName,
                'gender': req.body.gender,
            },
            {
                $set: {
                    'tree': req.body.tree
                }
            });

        res.json({ 'tree added ': 'ok' });

    }


    addPointsAndScoreToRepresentation = (req: express.Request, res: express.Response) => {
        console.log(req.body)

        Result.collection.updateOne(
            {
                'sportName': req.body.sportName,
                'disciplineName': req.body.disciplineName,
                'gender': req.body.gender,
                "group.groupNumber": req.body.groupNumber
            },
            {
                $inc: {
                    "group.$[outer].resultInGroups.$[inner].points": req.body.points,
                    "group.$[outer].resultInGroups.$[inner].playedPoints": req.body.playedPoints,

                }
            },
            {
                "arrayFilters": [
                    { "outer.groupNumber": req.body.groupNumber },
                    { "inner.nationality": req.body.nationality },

                ]
            }, (err, result) => {
                if (err) {
                    console.log('Error updating service: ' + err);
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    // console.log('' + result + ' document(s) updated');
                    res.json({ 'points added ': 'ok' });
                }
            });

    }

    finishGroupPhase = (req: express.Request, res: express.Response) => {
        Result.collection.updateOne(
            {
                'sportName': req.body.sportName,
                'disciplineName': req.body.disciplineName,
                'gender': req.body.gender,
            },
            {
                $set: {
                    'groupPhaseFinished': req.body.groupPhaseFinished
                }
            });

        res.json({ 'finished group phase': 'ok' });

    }

    addRepresentationsToTree = (req: express.Request, res: express.Response) => {

        Result.collection.updateOne(
            {
                'sportName': req.body.sportName,
                'disciplineName': req.body.disciplineName,
                'gender': req.body.gender,
                "tree.index": req.body.index
            },
            {
                $set: {
                    'tree.$.nationality1': req.body.nationality1,
                    'tree.$.nationality2': req.body.nationality2,
                    'tree.$.player1': req.body.player1,
                    'tree.$.player2': req.body.player2,
                }

            });

        res.json({ 'sport added': 'ok' });


    }

}
