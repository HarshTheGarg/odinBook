// To make a schema
const mongoose = require("mongoose");

// Make new user schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: String,
  email: String,
  passwordHash: String,
  passwordSalt: String,
  friends: [{type: Schema.Types.ObjectId, ref: "Users"}],
  friendRequests: [{type: Schema.Types.ObjectId, ref: "Users"}],
  friendsRequested: [{type: Schema.Types.ObjectId, ref: "Users"}]
});

module.exports = mongoose.model("User", UserSchema);
