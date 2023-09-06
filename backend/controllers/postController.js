const User = require("../models/user");
const BlogPost = require("../models/post");
const Comment = require("../models/comment");
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
                const authorId = decodedToken.id;
                newPost.user = authorId;
                const result = await newPost.save();
                res.sendStatus(200).json({ message: "Post created!"});
            } catch (err) {
                return next(err);
            };
        };
    })
];

exports.blogpost_list_get = async (req, res) => {
    try {
        const blogpostList = await BlogPost.find({}, { _id: 0, content: 0 })
            .populate('user', '-_id username')
            .exec();
        res.json({ blogpostList });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
};

exports.blogpost_detail_get = async (req, res, next) => {
    const post = await BlogPost
        .findById(req.params.id)
        .populate({
            path: 'user',
            select: 'username -_id'
        })
        .exec();
    if (post === null) {
        const err = new Error("Item not found");
        return next(err);
    };
    const comments = await Comment
        .find({ blogpost: post }, { _id: 0, blogpost: 0 })
        .populate({
            path: 'user',
            select: 'username -_id'
        })
        .exec();
    res.json({post, comments});
    return;
};