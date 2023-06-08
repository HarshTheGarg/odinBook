const User = require("../models/User");

const express = require("express");

const router = express.Router();

router.get("/find", async (req, res, next) => {
  const result = await User.find(
    { _id: { $nin: req.user.friends }, email: { $ne: req.user.email } },
    ["_id", "username", "email"]
  )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      next(err);
    });
  res.status(200).json({ success: true, usersList: result, friendsRequested: req.user.friendsRequested });
});

module.exports = router;
