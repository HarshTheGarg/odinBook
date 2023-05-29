const crypto = require("crypto");

const verifyPassword = (password, salt, hash) => {
  const hashPass = crypto
    .pbkdf2Sync(password, salt, 30000, 64, "sha512")
    .toString("hex");
  return hash == hashPass;
};

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
