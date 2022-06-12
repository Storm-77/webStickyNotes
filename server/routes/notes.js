const express = require("express");
const mongodb = require("mongodb");
const crypto = require('crypto');
const utils = require("../utils.js");
const { sendStatus } = require("express/lib/response");
const router = express.Router();

router.post("/register", async (req, res) => {

    if (!("password" in req.body && "login" in req.body)) {
        res.status(400);
        res.send("invalid object");
        return;
    }

    const users = await utils.UsersCollection();

    let usr = {
        name: req.body.login,
        password: utils.sha1(req.body.password),
        notes: []
    };

    let result = await users.find({ name: usr.name });
    let arr = await result.toArray();

    if (arr.length != 0) {
        res.status(500);
        res.send("users exits");
        return;
    }

    users.insertOne(usr).then(() => {
        const token = utils.CreateToken({ id: usr._id });

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
    if (!("password" in req.body && "login" in req.body)) {
        res.sendStatus(400);
        return;
    }
    const users = await utils.UsersCollection();
    let usr = {
        name: req.body.login,
        password: utils.sha1(req.body.password)
    };

    let dbusr = await users.findOne(usr);
    if (dbusr == null) {
        res.sendStatus(500);
        return;
    }

    const token = utils.CreateToken({ id: dbusr._id });

    res.json({
        token: token
    });

});

router.post("/notes", utils.authenticateToken, async (req, res) => {

    let note = {
        title: req.body.title,
        message: req.body.message,
        isurgent: req.body.isurgent
    }

    const users = await utils.UsersCollection();

    let dbresult = await users.updateOne(
        { _id: mongodb.ObjectId(req.user.id) },
        { $push: { notes: note } }
    );

    if (dbresult.modifiedCount = 1) {
        return res.json({
            message: "success"
        });
    }
    else return sendStatus(500);
});

//delete note
router.delete("/notes", utils.authenticateToken, async (req, res) => {

    //delete note

    const users = await utils.UsersCollection();

    let a = await users.update(
        {

            _id: mongodb.ObjectId(req.user.id)
        },
        {
            $pull: {
                'notes': {
                    title: req.body.title,
                    message: req.body.message,
                    isurgent: req.body.isurgent
                }
            }
        }

    );
    console.log(a);

    res.sendStatus(200);

});

router.get("/notes", utils.authenticateToken, async (req, res) => {

    const users = await utils.UsersCollection();

    const user = await users.findOne({ _id: mongodb.ObjectId(req.user.id) });

    res.json(
        {
            notes: user.notes
        }
    );

});

module.exports = router;
