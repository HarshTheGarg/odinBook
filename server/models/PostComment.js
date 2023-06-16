const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PostCommentSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: "User"},
  comment: {type: String},
  dateTime: {type: Date, default: Date.now}
});

module.exports = mongoose.model("PostComment", PostCommentSchema);
