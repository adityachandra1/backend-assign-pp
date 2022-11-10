const express = require("express");
const bodyParser = require("body-parser");

const { connectDB } = require("./config/db");

require("dotenv").config();

const app = express();
const TEST_PORT = 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || TEST_PORT, async () => {
    try {
        console.log(`Listening at port: ${process.env.PORT || TEST_PORT}...`);
        await connectDB();
    } catch (err) {
        console.log("Connection to Mongo unsuccessful...\n" + err);
        process.exit();
    }
});

app.get("/test", (req, res) => {
    res.send("Hello World!");
})
