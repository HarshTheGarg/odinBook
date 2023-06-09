const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  caption: String,
  author: {type: Schema.Types.ObjectId, ref:"User"},
  dateTime: {type: Date, default: Date.now},
  likes: [{type: Schema.Types.ObjectId, ref: "User"}],
  comments: [{type: Schema.Types.ObjectId, ref: "PostComment"}],
  postImageUrl: String 
});

module.exports = mongoose.model("Post", PostSchema);
