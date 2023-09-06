const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

BlogPostSchema.virtual("url").get(function () {
    return `/post/${this._id}`;
});

BlogPostSchema.virtual("comments", {
    ref:"Comment",
    localField: "_id",
    foreignField: "blogpost",
});

module.exports = mongoose.model("BlogPost", BlogPostSchema);