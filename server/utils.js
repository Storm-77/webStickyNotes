const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
require("dotenv").config();

async function UsersCollection() {
    try {
        const client = await mongodb.MongoClient.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true });
        return client.db("StickyNotes").collection("users");

    } catch (error) {
        console.log(error);
    }
    return null;
}

function CreateToken(userId) {
    return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET);
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err != null ? err : 'authentication successfull!')
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function sha1(text) {
    const shasum = crypto.createHash('sha1')
    shasum.update(text);
    return shasum.digest('hex');
}

module.exports = {
    CreateToken,
    UsersCollection,
    sha1,
    authenticateToken
}