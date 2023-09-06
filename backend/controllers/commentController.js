const User = require("../models/user");
const BlogPost = require("../models/post");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
require('dotenv').config();
const jwt = require("jsonwebtoken");

exports.comment_post = [
    body('content')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Content must be specified."),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const { content, postId } = req.body;
        const newComm = new Comment({
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
                const authorId = decodedToken.id;
                newComm.user = authorId;
                newComm.blogpost = postId;
                const result = await newComm.save();
                res.sendStatus(200).json({ message: "Comment created!"});
            } catch (err) {
                return next(err);
            };
        };
    })
];