const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true, maxLength: 100 },
});

UserSchema.virtual("url").get(function () {
    return `/user/${this._id}`;
});

UserSchema.virtual("posts", {
    ref:"Blogpost",
    localField: "_id",
    foreignField: "user",
});

module.exports = mongoose.model("User", UserSchema);