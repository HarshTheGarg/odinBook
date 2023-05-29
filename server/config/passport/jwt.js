// DB user model to find the user in the DB
const User = require("../../models/User");

// Passport-jwt to authenticate the user
const jwt = require("passport-jwt");
const passport = require("passport");
const jwtStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt; // To get the jwt from the authorization header (or someplace else if required)

// File structure and path to find the public key and store the data in variable
const fs = require("fs");
const path = require("path");
const pathToKey = path.join(__dirname, "../../keys", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf-8");

// JWT strategy options
const options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

// Creating the JWT strategy
const strategy = new jwtStrategy(options, (payload, done) => {
  // Finding User in the DB using the _id stored in JWT payload
  User.findById(payload.sub)

    .then((user) => {
      // User not found
      if (!user) {
        done(null, false);
      }
      // User found
      else {
        done(null, user);
      }
    })
    // Error in running query
    .catch((err) => {
      done(err);
    });
});

passport.use(strategy);
