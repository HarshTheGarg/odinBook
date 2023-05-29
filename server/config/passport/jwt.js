const fs = require("fs");
const path = require("path");
const User = require("../../models/User");
const jwt = require("passport-jwt");

const jwtStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt;

const pathToKey = path.join(__dirname, "../../keys", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf-8");

const options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const strategy = new jwtStrategy(options, (payload, done) => {
  User.findById(payload.sub)
    .then((user) => {
      if (!user) {
        done(null, false);
      } else {
        done(null, user);
      }
    })
    .catch((err) => {
      done(err);
    });
});

module.exports = (passport) => {
  passport.use(strategy);
};
