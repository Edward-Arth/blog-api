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
    .withMessage("Content must be specified.")
    .customSanitizer((value) => {
        return value.replace(/'/g, "'");
    })
    .customSanitizer((value) => {
        return value.replace(/\\"/g, '"');
    }),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const { content } = req.body;
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
                if (!decodedToken) {
                    throw "Error authenticating user";
                }
                const authorId = decodedToken.id;
                newComm.user = authorId;
                newComm.blogpost = req.params.id;
                const result = await newComm.save();
                if (!result) {
                    throw "Error creating comment";
                }
                res.json({ message: "Comment created!"});
            } catch (err) {
                return next(err);
            };
        };
    })
];