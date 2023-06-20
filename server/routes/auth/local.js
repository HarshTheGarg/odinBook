// Require Express and create router
const express = require("express");
const router = express.Router();

// Require the User Model to make/find users in DB
const User = require("../../models/User");

// Utils to perform various functions
const passwordUtils = require("../../lib/passwordUtils");
const issueJWT = require("../../lib/jwtUtils").issueJWT;

// User Login
router.post("/login", (req, res, next) => {
  // Find user in the database
  User.findOne({ email: req.body.email })
    .then((user) => {
      // No error in running the query

      // No user found
      if (!user) {
        res.status(401).json({ success: false, msg: "User Not Found" });
      }

      // User found, check password
      const isValid = passwordUtils.verifyPassword(
        req.body.password,
        user.passwordSalt,
        user.passwordHash
      );

      // Correct password
      if (isValid) {
        // Issue the JWT and respond to the client
        const { token, expires } = issueJWT(user);
        const userDet = {
          _id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar
        };
        res.json({ success: true, token, expires, userDet });
      }
      // Incorrect password
      else {
        res.status(401).json({ success: false, msg: "Incorrect Password" });
      }
    })

    // Error in running the query
    .catch((err) => {
      next(err);
    });
});

// User Register
router.post("/register", (req, res, next) => {
  // Generate the hash and salt for the user's password
  const { salt, hash } = passwordUtils.genPassword(req.body.password);

  // Create new user using the user model
  const newUser = new User({
    username: req.body.username,
    passwordHash: hash,
    passwordSalt: salt,
    email: req.body.email,
  });

  // Save the user in the DB
  newUser
    .save()
    .then((user) => {
      // Issue the JWT and respond to the client
      const { token, expires } = issueJWT(user);
      const userDet = {
        username: user.username,
        email: user.email,
      };
      res.json({ success: true, token, expires, userDet });
    })

    // Error in saving the user in DB
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
