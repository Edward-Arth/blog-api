const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    blogpost: { type: Schema.Types.ObjectId, ref: 'BlogPost' }
});

module.exports = mongoose.model("Comment", CommentSchema);