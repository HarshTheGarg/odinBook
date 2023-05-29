const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path")

const pathToPrivKey = path.join(__dirname, "../keys", "id_rsa_pri.pem")
const PRIV_KEY = fs.readFileSync(pathToPrivKey, "utf-8")

const issueJWT = (user) => {
  const id = user._id;

  const expiresIn = "1d";

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256"
  })

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
};

module.exports.issueJWT = issueJWT