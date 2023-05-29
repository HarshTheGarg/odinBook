// Require express and make router
const express = require("express");
const router = express.Router();

// Passport to authenticate the user
const passport = require("passport");

// Home route, responds with sample text
router.get("/", (req, res) => {
  res.json({ msg: "Hello" });
});

// Route to authenticate the users
router.use("/auth", require("./auth/auth"));

// Test route to be deleted
router.get("/test", (req, res) => {
  res.json({ msg: "I am a test" });
});

// Test route to be deleted
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ success: true, username: req.user.username });
  }
);

module.exports = router;
