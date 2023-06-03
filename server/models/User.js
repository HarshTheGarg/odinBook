// To make a schema
const mongoose = require("mongoose");

// Make new user schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: String,
  email: String,
  passwordHash: String,
  passwordSalt: String,
});

module.exports = mongoose.model("User", UserSchema);
