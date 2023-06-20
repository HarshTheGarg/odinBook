const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../../models/User");

require("dotenv").config();

const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  function (accessToken, refreshToken, profile, done) {
    console.log(profile._json.picture);
    User.findOne({ email: profile._json.email })
      .then((user) => {
        if (user) {
          // console.log(user);
          done(null, user);
        } else {
          const newUser = new User({
            username: profile.displayName,
            email: profile._json.email,
            avatar: profile._json.picture
          });

          newUser
            .save()
            .then((user) => {
              done(null, user);
            })
            .catch((err) => {
              done(err);
            });
        }
      })
      .catch((err) => {
        done(err);
      });
  }
);

passport.use(strategy);
