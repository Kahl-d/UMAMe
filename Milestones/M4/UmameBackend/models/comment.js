const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    hearts: {type: String, required: true},
    commentOwner: {type: String, required: true},
    content: {type: String, required: true},
})

module.exports = mongoose.model("Comment", commentSchema);