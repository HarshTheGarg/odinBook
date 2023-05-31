const express = require("express");
const router = express.Router();

const passport = require("passport");
const { issueJWT } = require("../../lib/jwtUtils");

router.get(
  "/",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "failure",
  }),
  (req, res) => {
    // console.log(req.user);
    if (req.user) {

      const {token, expires} = issueJWT(req.user);
      res.redirect(`http://localhost:5000/OAuthRedirect/?token=${token}&expires=${expires}`)
      // res.status(200).json({ success: true });
    } else {
      res.status(500).json({ success: false });
    }
  }
);

router.get("/failure", (req, res) => {
  res.status(401).json({ success: false, msg: "Error in signing in" });
});

module.exports = router;
