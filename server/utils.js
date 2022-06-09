const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");
const crypto = require('crypto')


const connectionString = 'mongodb+srv://expressapi:XmEH7vvlhR7p1K3S@stickynotes.t0zrfto.mongodb.net/?retryWrites=true&w=majority';

const jwtData = {
    headerKey: "headerKey",
    jwtSecretKey: "super secret Secret"
}


async function UsersCollection() {
    try {
        const client = await mongodb.MongoClient.connect(connectionString, { useNewUrlParser: true });
        return client.db("StickyNotes").collection("users");

    } catch (error) {
        console.log(error);
    }
    return null;
}

async function AuthenticateRoute(req, res, next) {
    try {
        const token = req.cookies.jwt;

        const verified = jwt.verify(token, jwtData.jwtSecretKey);
        if (verified) {
            next(verified);
        } else {
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
}

const maxAge = 3 * 24 * 60 * 60;
function CreateToken(userId) {
    return jwt.sign({ userId }, jwtData.jwtSecretKey,
        {
            expiresIn: maxAge
        });
}

function sha1(text) {
    const shasum = crypto.createHash('sha1')
    shasum.update(text);
    return shasum.digest('hex');
}

module.exports = {
    CreateToken,
    AuthenticateRoute,
    UsersCollection,
    sha1,
    maxAge
}