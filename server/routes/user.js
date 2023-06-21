const express = require("express");

const router = express.Router();

// const User = require("../models/User");

router.get("/data", (req, res) => {
  const userDet = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    avatar: req.user.avatar,
  };
  res.json({ success: true, userDet });
});

router.use("/friends", require("./friends"));

router.use("/password", require("./password"));

module.exports = router;
