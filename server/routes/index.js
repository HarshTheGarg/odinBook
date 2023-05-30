// Require express and make router
const express = require("express");
const router = express.Router();

// Passport to authenticate the user
const passport = require("passport");

// TODO Enable while deploying
// router.use(express.static(path.join(__dirname, "../../client/dist/")));

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

// TODO Enable while deploying
/* router.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});
 */
module.exports = router;
