const express = require("express");

const router = express.Router();

// const User = require("../models/User");

router.get(
  "/data",
  (req, res) => {
    const userDet = {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    };
    res.json({ success: true, user: userDet });
  }
);

router.use(
  "/friends",
  require("./friends")
);

module.exports = router;
