"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerController = void 0;
const player_1 = __importDefault(require("../models/player"));
class PlayerController {
    constructor() {
        this.fetchByFirstnameAndLastname = (req, res) => {
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            console.log(firstname);
            console.log(lastname);
            player_1.default.findOne({ 'firstname': firstname, 'lastname': lastname }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.addPlayer = (req, res) => {
            let player = new player_1.default(req.body);
            console.log(player);
            player.save().then(player => { res.json({ 'player added': 'ok' }); }).catch(err => { res.json(err); });
        };
        this.addDisciplineToPlayer = (req, res) => {
            console.log(req.body);
            player_1.default.collection.updateOne({
                'firstname': req.body.firstname,
                'lastname': req.body.lastname,
            }, {
                $push: { "disciplines": req.body.disciplineName }
            });
            res.json({ "added sport-discipline to player": "OK" });
        };
        this.fetchByNationalitySportDisciplineAndGender = (req, res) => {
            console.log(req.body);
            console.log(req.body.discipline);
            if (req.body.discipline == null) {
                player_1.default.find({
                    'nationality': req.body.nationality,
                    'sportName': req.body.sportName,
                    'gender': req.body.gender
                }, (err, user) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(user);
                });
            }
            else {
                player_1.default.find({
                    'nationality': req.body.nationality,
                    'sportName': req.body.sportName,
                    'gender': req.body.gender,
                    'disciplines': { "$in": [req.body.discipline] }
                }, (err, user) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(user);
                });
            }
        };
        this.removePlayer = (req, res) => {
            console.log(req.body);
            player_1.default.collection.deleteOne({ 'firstname': req.body.firstname, 'lastname': req.body.lastname });
            res.json({ 'removed player': 'ok' });
        };
        this.removeDisciplineFromPlayer = (req, res) => {
            console.log(req.body);
            player_1.default.collection.updateOne({
                'firstname': req.body.firstname,
                'lastname': req.body.lastname,
            }, {
                $pull: { "disciplines": req.body.disciplineName }
            });
            player_1.default.findOne({ 'firstname': req.body.firstname, 'lastname': req.body.lastname }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.fetchByNationality = (req, res) => {
            console.log(req.body);
            player_1.default.find({ 'nationality': req.body.nationality }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.addMedal = (req, res) => {
            let medal = req.body.medal;
            console.log(req.body);
            if (medal == "goldMedals") {
                player_1.default.collection.updateOne({
                    'firstname': req.body.firstname,
                    'lastname': req.body.lastname,
                }, {
                    $push: { "goldMedals": req.body.competitionName }
                });
                res.json({ "added medal to player": "OK" });
            }
            else if (medal == "silverMedals") {
                player_1.default.collection.updateOne({
                    'firstname': req.body.firstname,
                    'lastname': req.body.lastname,
                }, {
                    $push: { "silverMedals": req.body.competitionName }
                });
                res.json({ "added medal to player": "OK" });
            }
            else {
                player_1.default.collection.updateOne({
                    'firstname': req.body.firstname,
                    'lastname': req.body.lastname,
                }, {
                    $push: { "bronseMedals": req.body.competitionName }
                });
                res.json({ "added medal to player": "OK" });
            }
        };
    }
}
exports.PlayerController = PlayerController;
//# sourceMappingURL=player.controller.js.map