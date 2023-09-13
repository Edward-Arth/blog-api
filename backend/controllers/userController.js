const User = require("../models/user");
const BlogPost = require("../models/post");
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
            const token = jwt.sign({ id: user.id }, process.env.TOKENKEY, { expiresIn: '2h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'No login match' });
        }
    } else {
        res.status(401).json({ message: 'No login match' });
    }
});

exports.user_get = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id, {password: 0}).exec();
        if (!user) {
            throw "Error finding user.";
        }
        res.json({user});
    } catch(err) {
        return next(err);
    };
};

exports.user_list_get = async (req, res) => {
    try {
        const userList = await User.find({}, 'username posts')
            .populate("posts")
            .exec();
        res.json({ userList });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.user_likes_post = async (req, res, next) => {
    try {
        const tokenWithBear = req.headers.authorization;
        const bearer = tokenWithBear.split(" ");
        const token = bearer[1];
        const decodedToken = await jwt.verify(token, process.env.TOKENKEY);
        if(!decodedToken) {
            throw "User authentication failed!";
        }
        const userToUpdate = await User.findByIdAndUpdate(decodedToken.id, { $push: { likes: req.params.id }});
        if(!userToUpdate) {
            throw "Failed to find and update user likes!";
        } else {
            res.json({message: "Post added to user likes!"})
        }
    } catch (err) {
        return next(err);
    };
};

exports.user_unlikes_post = async (req, res, next) => {
    try {
        const tokenWithBear = req.headers.authorization;
        const bearer = tokenWithBear.split(" ");
        const token = bearer[1];
        const decodedToken = await jwt.verify(token, process.env.TOKENKEY);
        if(!decodedToken) {
            throw "User authentication failed!";
        }
        const userToUpdate = await User.findByIdAndUpdate(decodedToken.id, { $pull: { likes: req.params.id }});
        if(!userToUpdate) {
            throw "Failed to find and update user likes!";
        } else {
            res.json({message: "Post removed from user likes!"})
        }
    } catch (err) {
        return next(err);
    }
};

exports.user_likes_get = async (req, res, next) => {
    try {
        const tokenWithBear = req.headers.authorization;
        const bearer = tokenWithBear.split(" ");
        const token = bearer[1];
        const decodedToken = await jwt.verify(token, process.env.TOKENKEY);
        if(!decodedToken) {
            throw "User authentication failed!";
        }
        const userLikes = await User.findById(decodedToken.id, {likes:1}).populate('likes').exec();
        if(!userLikes) {
            throw "Failed to get user likes!";
        } else {
            res.json({userLikes})
        }
    } catch (err) {
        return next(err);
    };
};