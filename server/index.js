const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const notes = require("./routes/notes");
app.use("/api", notes);

app.get("/", (req, res) => {
    res.send("main page bitch");
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));


