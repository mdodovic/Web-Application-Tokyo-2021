import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routers/user.router';
import sportRouter from './routers/sport.router';
import playerRouter from './routers/player.router';
import nationalTeamRouter from './routers/nationalTeam.router';
import competitionRouter from './routers/competition.router';
import timetableRouter from './routers/timetable.router';
import resultRouter from './routers/result.router';
import stateRouter from './routers/state.router';
import groupRouter from './routers/group.router';
import roundRouter from './routers/round.router';
import worldRecordRouter from './routers/worldRecord.router';


const app = express();


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/tokyo_2021');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongo ok')
});


const router = express.Router();
router.use('/users', userRouter);
router.use('/sports', sportRouter);
router.use('/players', playerRouter);
router.use('/national-teams', nationalTeamRouter);
router.use('/competitions', competitionRouter);
router.use('/timetables', timetableRouter);
router.use('/results', resultRouter);
router.use('/state', stateRouter);
router.use('/group', groupRouter);
router.use('/round', roundRouter);
router.use('/world-records', worldRecordRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));

