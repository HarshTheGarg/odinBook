const express = require("express");

const router = express.Router();

const passwordUtils = require("../lib/passwordUtils");
const User = require("../models/User");

router.post("/verify", (req, res) => {
  const isValid = passwordUtils.verifyPassword(
    req.body.password,
    req.user.passwordSalt,
    req.user.passwordHash
  );

  res.json({ success: true, isValid });
});

router.post("/change", async (req, res, next) => {
  const { salt, hash } = passwordUtils.genPassword(req.body.password);

  const user = await User.findById(req.user._id);
  user.passwordHash = hash;
  user.passwordSalt = salt;

  await user.save().catch((err) => {
    next(err);
  });

  res.json({ success: true });
});

router.get("/isSet", (req, res) => {
  if (req.user.passwordHash) {
    res.json({ success: true, isSet: true });
  } else {
    res.json({ success: true, isSet: false });
  }
});

module.exports = router;
