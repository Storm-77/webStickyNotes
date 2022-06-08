const express = require("express");
const { route } = require("express/lib/router");
const mongodb = require("mongodb");
const crypto = require('crypto')
const jwt = require("jsonwebtoken");

const router = express.Router();
//get notes

function sha1(text) {
    const shasum = crypto.createHash('sha1')
    shasum.update(text);
    return shasum.digest('hex');
}

const connectionString = 'mongodb+srv://expressapi:XmEH7vvlhR7p1K3S@stickynotes.t0zrfto.mongodb.net/?retryWrites=true&w=majority';

async function UsersCollection() {
    try {
        const client = await mongodb.MongoClient.connect(connectionString, { useNewUrlParser: true });
        return client.db("StickyNotes").collection("users");

    } catch (error) {
        console.log(error);
    }
    return null;
}

const maxAge = 3 * 24 * 60 * 60;
function CreateToken(userId) {
    return jwt.sign({ userId }, "super secret SEcret",
        {
            expiresIn: maxAge
        });
}

router.get("/notes", async (req, res) => {

    res.json({
        std: "exa",
        e: 34
    });

});


router.post("/register", async (req, res) => {

    if (!("password" in req.body && "name" in req.body)) {
        res.status(400);
        res.send("invalid object");
        return;
    }

    const users = await UsersCollection();

    let usr = {
        name: req.body.name,
        password: sha1(req.body.password)
    };

    let result = await users.find({name:usr.name});
    let arr = await result.toArray();

    if (arr.length != 0) {
        res.status(500);
        res.send("users exits");
        return;
    }

    users.insertOne(usr).then(() => {
         const token = CreateToken(usr._id);
         res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

        res.json({
            id: usr._id
        });
    }).catch(e => {
        res.status(400);
        res.send("Cannot commit operation");
        console.error(e);
    });
    //implement jwt
});

router.post("/login", async (req, res) => {
    if (!("password" in req.body && "name" in req.body)) {
        res.status(400);
        res.json({ message: "invalid object" });
        return;
    }
    const users = await UsersCollection();
    let usr = {
        name: req.body.name,
        password: sha1(req.body.password)
    };

    let dbusr = await users.findOne(usr);

    if (dbusr === null) {
        res.status(404);
        res.json({ message: "incorrect login" });
        return;
    }
    res.json({
        token: dbusr._id // TODO use a real token, not user id
    });

});

router.post("/notes", async (req, res) => {
    //add note

});

router.delete("/notes", async (req, res) => {
    //delete note

});

router.get("/notes", async (req, res) => {
    //get all user's notes

});

module.exports = router;
