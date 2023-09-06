const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require('dotenv').config();
const jwt = require("jsonwebtoken");

exports.user_signup_post = [
    body('username')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Username must be specified."),
    body('password')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Password must be specified."),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const { username, password } = req.body;
        const newUser = new User({
            username: username,
        });

        if(!errors.isEmpty()) {
            res.json({ errors: errors.array() });
            return;
        } else {
            try {
                bcrypt.hash(password, 10, async(err, hashedPassword) => {
                    if(err) {
                        return next(err);
                    } else {
                        newUser.password = hashedPassword;
                        const result = await newUser.save();
                        res.sendStatus(200);
                    }
                });
            } catch (err) {
                return next(err);
            };
        };
    })
];

exports.user_login_post = (async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign({ id: user.id }, process.env.TOKENKEY, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'No login match' });
        }
    } else {
        res.status(401).json({ message: 'No login match' });
    }
});

exports.user_list_get = async (req, res) => {
    try {
        const userList = await User.find({}, { _id: 0, username: 1 })
            .sort({ name: 1 })
            .populate("posts")
            .exec();
        res.json({ userList });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
    }
};