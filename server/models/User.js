const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  passwordHash: String,
  passwordSalt: String
})

module.exports = mongoose.model("Users", UserSchema);