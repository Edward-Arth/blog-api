const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const mongoose = require("mongoose");

const indexRouter = require('./routes/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.set("strictQuery", false);
const mongoDB = process.env.DBKEY;

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
};

const port = process.env.PORT || 3000;

app.use('/api', indexRouter);

app.listen(port);
console.log("App running");