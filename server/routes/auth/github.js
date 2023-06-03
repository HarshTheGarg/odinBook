const express = require("express");
const router = express.Router();

const passport = require("passport");
const { issueJWT } = require("../../lib/jwtUtils");

router.get(
  "/",
  passport.authenticate("github", { scope: ["user:email"], session: false })
);

router.get(
  "/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "failure",
  }),
  (req, res) => {
    if (req.user) {
      const { token, expires } = issueJWT(req.user);
      res.redirect(
        `http://localhost:5000/OAuthRedirect/?token=${token}&expires=${expires}`
      );
    } else {
      res.status(500).json({ success: false });
    }
  }
);

router.get("/failure", (req, res) => {
  res.status(401).json({ success: false, msg: "Error in signing in" });
});

module.exports = router;
