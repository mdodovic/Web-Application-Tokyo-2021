import express from 'express';
import { WorldRecordController } from '../controllers/worldRecord.controller';

const worldRecordRouter = express.Router();

worldRecordRouter.route('/fetchAllWorldRecords').get(
    (req, res) => new WorldRecordController().fetchAllWorldRecords(req, res)
);

export default worldRecordRouter;

