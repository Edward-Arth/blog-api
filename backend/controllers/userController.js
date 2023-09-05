const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

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