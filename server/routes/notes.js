const express = require("express");
const { route } = require("express/lib/router");
const mongodb = require("mongodb");
const crypto = require('crypto')
const shasum = crypto.createHash('sha1')

const router = express.Router();
//get notes

function sha1(text) {
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

router.get("/notes", async (req, res) => {

    res.json({
        std:"exa",
        e:34
    });

});


router.post("/register", async (req, res) => {

    const users = await UsersCollection();

    //check for name conflict

    let usr = {
        name: req.body.name,
        password: sha1(req.body.password)
    };

    await users.insertOne(usr);

    res.json({
        id: usr._id
    });

});

router.post("/login", async (req, res)=>{

});

//add note

//delete note

module.exports = router;
