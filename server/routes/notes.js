const express = require("express");
const { route } = require("express/lib/router");
const mongodb = require("mongodb");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const utils = require("../utils.js")
const router = express.Router();

router.post("/register", async (req, res) => {

    if (!("password" in req.body && "name" in req.body)) {
        res.status(400);
        res.send("invalid object");
        return;
    }

    const users = await utils.UsersCollection();

    let usr = {
        name: req.body.name,
        password: utils.sha1(req.body.password),
        notes:[]
    };

    let result = await users.find({ name: usr.name });
    let arr = await result.toArray();

    if (arr.length != 0) {
        res.status(500);
        res.send("users exits");
        return;
    }

    users.insertOne(usr).then(() => {
        const token = utils.CreateToken(usr._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: utils.maxAge * 1000 });

        res.json({
            token: token
        });
    }).catch(e => {
        res.status(400);
        res.send("Cannot commit operation");
        console.error(e);
    });
});

router.post("/login", async (req, res) => {
    if (!("password" in req.body && "name" in req.body)) {
        res.status(400);
        res.json({ message: "invalid object" });
        return;
    }
    const users = await utils.UsersCollection();
    let usr = {
        name: req.body.name,
        password: utils.sha1(req.body.password)
    };

    let dbusr = await users.findOne(usr);

    if (dbusr === null) {
        res.status(404);
        res.json({ message: "incorrect login" });
        return;
    }

    const token = utils.CreateToken(dbusr._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: utils.maxAge * 1000 });

    res.json({
        token: token
    });

});

router.post("/notes", async (req, res) => {
    //add note
    utils.AuthenticateRoute(req, res, tokenpayload => {

        let note = {
            title: req.body.title,
            message: req.body.message,
            isurgent: req.body.isurgent
        }

        db.students.updateOne(
            { _id: tokenpayload.userId },
            { $push: { notes: note } }
         );
        //insert note to database
        return res.json({
            id: tokenpayload.userId,
            message:"success"
        });
    });
});

router.delete("/notes", async (req, res) => {

    utils.AuthenticateRoute(req, res, tokenpayload => {

        let usrId = tokenpayload.userId;
        //delete note



    });
});

router.get("/notes", async (req, res) => {
    utils.AuthenticateRoute(req, res, tokenpayload => {
        let usrId = tokenpayload.userId;

        //get all user's notes from db


    });
});

module.exports = router;
