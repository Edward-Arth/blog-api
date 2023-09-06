const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("./models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

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

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKENKEY,
};

passport.use(
    new JwtStrategy(jwtOptions, async(jwt_payload, done) => {
        try {
            const user = await User.find((u) => u._id === jwt_payload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch(err) {
            return done(err);
        }
    })
);

const port = process.env.PORT || 8000;

app.use('/api', indexRouter);

app.listen(port);
console.log("App running");