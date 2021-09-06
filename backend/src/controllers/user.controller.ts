import express from "express";
import User from "../models/user";

export class UserController {
    fetchByUsername = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        console.log(username)
        User.findOne({ 'username': username },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            }
        )
    }

    fetchByTypeAndCountry = (req: express.Request, res: express.Response) => {
        let type = req.body.type;
        let counrty = req.body.country;
        console.log(type);
        console.log(counrty);
        User.findOne({ 'type': type, 'nationality': counrty },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            }
        )
    }

    addUser = (req: express.Request, res: express.Response) => {
        let user = new User(req.body);
        console.log(user);
        user.save().then(user => { res.json({ 'user added': 'ok' }) }).catch(err => { res.json(err) })
    }

    changePasswordByUsername = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let newPassword = req.body.newPassword;
        console.log(username);
        console.log(newPassword);

        User.collection.updateOne({ 'username': username }, { $set: { 'password': newPassword } });
        res.json({ 'password changed': 'ok' });
    }

    fetchByType = (req: express.Request, res: express.Response) => {
        let type = req.body.type;

        User.find({ 'type': type, 'accepted': 1 },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            }
        )
    }

}