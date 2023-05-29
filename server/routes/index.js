const express = require("express");
const passwordUtils = require("../lib/passwordUtils");
require("../config/mongoConnection");
const User = require("../models/User");
const issueJWT = require("../lib/jwtUtils").issueJWT;
const passport = require("passport");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Hello" });
});

router.get("/test", (req, res) => {
  // console.log(req.body.username, req.body.email, req.body.password);
  // res.json({ msg: "done" });

  User.findOne({ email: "harsh@example.com" })
    .then((user) => {
      console.log(user);
      res.json({ msg: "here" });
    })
    .catch((err) => {
      console.log(err);
      res.json({ err });
    });
});

router.post("/login", (req, res, next) => {
  // console.log(req.body.email, req.body.password);
  // res.json({ msg: "done" });

  // console.log(req.body.email);

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ success: false, msg: "User Not Found" });
      }

      const isValid = passwordUtils.verifyPassword(
        req.body.password,
        user.passwordSalt,
        user.passwordHash
      );

      if (isValid) {
        const { token, expires } = issueJWT(user);

        res.json({ success: true, token, expires, user });
      } else {
        res.status(401).json({ success: false, msg: "Incorrect Password" });
      }
    })
    .catch((err) => {
      // err.message = "Error in fetching data from the database";
      next(err);
    });
});

router.post("/register", (req, res, next) => {
  // console.log(req.body.username, req.body.email, req.body.password);
  // res.json({ msg: "done" });

  const { salt, hash } = passwordUtils.genPassword(req.body.password);

  const newUser = new User({
    username: req.body.username,
    passwordHash: hash,
    passwordSalt: salt,
    email: req.body.email,
  });

  newUser
    .save()
    .then((user) => {
      const { token, expires } = issueJWT(user);

      res.json({ success: true, user, token, expires });
    })
    .catch((err) => {
      next(err);
    });
});

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ success: true, username: req.user.username });
  }
);

router.get("/redirect", (req, res) => {
  res.json({ msg: "Redirected" });
});

// router.get("/createUser", (req, res) => {
//   const testUser = new Users({
//     username: "Harsh",
//     passwordHash: "SDFSD",
//   });

//   testUser.save();
//   res.json({ msg: "DONE" });
// });

module.exports = router;
