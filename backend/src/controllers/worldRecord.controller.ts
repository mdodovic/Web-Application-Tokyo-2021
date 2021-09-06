import express from "express";
import WorldRecord from "../models/worldRecord";

export class WorldRecordController {

    fetchAllWorldRecords = (req: express.Request, res: express.Response) => {
        WorldRecord.find({}, (err, worldRecords) => {
            if (err) console.log(err);
            else {
                console.log(worldRecords);
                res.json(worldRecords);
            }
        })
    }


}