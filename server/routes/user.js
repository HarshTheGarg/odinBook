const express = require("express");
const passport = require("passport");

const router = express.Router();

const User = require("../models/User");

router.get(
  "/data",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userDet = {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    };
    res.json({ success: true, user: userDet });
  }
);

router.use("/friends", passport.authenticate("jwt", {session: false}), require("./friends"))

router.get(
  "/allUsers",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    User.find({ email: { $ne: req.user.email } }, ["_id", "username", "email"])
      .then((response) => {
        console.log(response);
        res.status(200).json({ success: true, usersList: response });
      })
      .catch((err) => {
        next(err);
      });
  }
);

module.exports = router;
