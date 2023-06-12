const User = require("../models/User");

const express = require("express");

const router = express.Router();

router.get("/find", async (req, res, next) => {
  const idList = [...req.user.friends, ...req.user.friendRequests];
  const result = await User.find(
    { _id: { $nin: idList }, email: { $ne: req.user.email } },
    ["_id", "username", "email"]
  )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      next(err);
    });
  res.status(200).json({
    success: true,
    usersList: result,
    friendsRequested: req.user.friendsRequested,
  });
});

router.use("/requests", require("./requests"));

module.exports = router;
