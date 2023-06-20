const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

const User = require("../../models/User");

require('dotenv').config();

const strategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    scope: ["user:email"],
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ email: profile.emails[0].value })
      .then((user) => {
        if (user) {
          // console.log(user);
          done(null, user);
        } else {
          const newUser = new User({
            username: profile.username,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value
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
)

passport.use(strategy);