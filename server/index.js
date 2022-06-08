const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

const notes = require("./routes/notes");
app.use("/api", notes);

app.get("/", (req, res) => {
    res.send("main page bitch");
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));


