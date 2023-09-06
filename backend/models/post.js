const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model("BlogPost", BlogPostSchema);