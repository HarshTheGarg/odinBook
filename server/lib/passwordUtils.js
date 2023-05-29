// in-built library to encrypt the data
const crypto = require("crypto");

// Verify the password sent by the user
const verifyPassword = (password, salt, hash) => {
  const hashPass = crypto
    .pbkdf2Sync(password, salt, 30000, 64, "sha512")
    .toString("hex");
  return hash == hashPass;
};

// Generate a random salt and use that to create a hash and return both
const genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 30000, 64, "sha512")
    .toString("hex");

  return {
    salt,
    hash,
  };
};

module.exports.verifyPassword = verifyPassword;
module.exports.genPassword = genPassword;
