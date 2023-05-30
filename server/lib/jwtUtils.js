// To create the jwt
const jsonwebtoken = require("jsonwebtoken");

// To find and store the private key in a variable
const fs = require("fs");
const path = require("path")
const pathToPrivKey = path.join(__dirname, "../keys", "id_rsa_pri.pem")
const PRIV_KEY = fs.readFileSync(pathToPrivKey, "utf-8")

// Function to issue the jwt with user._id as payload
const issueJWT = (user) => {

  // Extract the user's id from the user object sent
  const id = user._id;

  // Set JWT expiry
  const expiresIn = "1 days";

  // Create the payload
  const payload = {
    sub: id,
    iat: Date.now(),
  };

  // Create a JWT
  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256"
  })

  // Return the bearer token and the expiry
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
};

module.exports.issueJWT = issueJWT