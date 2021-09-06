import express from "express";
import State from "../models/state";

export class StateController {

    addMedal = (req: express.Request, res: express.Response) => {
        console.log(req.body);
        if (req.body.medal == "goldMedals") {
            State.collection.updateOne(
                { 'countryName': req.body.countryName },
                { $inc: { 'goldMedals': 1 } });

        } else if (req.body.medal == "silverMedals") {
            State.collection.updateOne(
                { 'countryName': req.body.countryName },
                { $inc: { 'silverMedals': 1 } });

        } else {
            State.collection.updateOne(
                { 'countryName': req.body.countryName },
                { $inc: { 'bronseMedals': 1 } });
        }
        res.json({ 'added medal to the state': 'ok' });
    }

}