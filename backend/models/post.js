const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    user: { type: String, ref: 'User.username' },
});

module.exports = mongoose.model("BlogPost", BlogPostSchema);