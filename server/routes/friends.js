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

router.get("/all", async (req, res, next) => {
  const result = await User.find({_id: {$in: req.user.friends}}, "_id username email")
    .then((response) => {
      if(!response) {
        return null;
      } else {
        return response;
      }
    }).catch((err) => {
      next(err);
    });
  
  res.json({
    success: true,
    friendsList: result
  })
})

router.use("/requests", require("./requests"));

module.exports = router;
