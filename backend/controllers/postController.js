const User = require("../models/user");
const BlogPost = require("../models/post");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
require('dotenv').config();
const jwt = require("jsonwebtoken");

exports.blogpost_post = [
    body('title')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Title must be specified."),
    body('content')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Content must be specified."),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const { title, content } = req.body;
        const newPost = new BlogPost({
            title: title,
            content: content,
        });
        if(!errors.isEmpty()) {
            res.json({ errors: errors.array() });
            return;
        } else {
            try {
                const tokenWithBear = req.headers.authorization;
                const bearer = tokenWithBear.split(" ");
                const token = bearer[1];
                const decodedToken = await jwt.verify(token, process.env.TOKENKEY);
                const authorId = decodedToken.userId;
                newPost.user = authorId;
                const result = await newPost.save();
                res.sendStatus(200).json({ message: "Post created!"});
            } catch (err) {
                return next(err);
            };
        };
    })
];