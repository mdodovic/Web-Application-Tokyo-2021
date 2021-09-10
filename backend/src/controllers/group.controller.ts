import express from "express";
import Group from "../models/group";

export class GroupController {

    addGroup = (req: express.Request, res: express.Response) => {
        let group = new Group(req.body);
        console.log(group);
        group.save().then(group => { res.json({ 'group, round matches added': 'ok' }) }).catch(err => { res.json(err) })

    }


    fetchBySportAndGender = (req: express.Request, res: express.Response) => {

        Group.find({
            'sportName': req.body.sportName,
            'gender': req.body.gender
        },
            (err, groups) => {
                if (err) console.log(err);
                else res.json(groups);
            }
        )

    }

    addPointsToGroupMatch = (req: express.Request, res: express.Response) => {
        console.log(req.body)
        Group.collection.updateOne(
            {
                "sportName": req.body.sportName,
                "gender": req.body.gender,
                "groupNumber": req.body.groupNumber,
                "roundNumber": req.body.roundNumber,
                "groupMatches.index": req.body.index
            },
            {
                $set: { 'groupMatches.$.score': req.body.score }
            });

        res.json({ 'sport added': 'ok' });


    }



}
