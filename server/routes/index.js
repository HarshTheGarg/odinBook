// Require express and make router
const express = require("express");
const router = express.Router();

const passport = require("passport");

const path = require("path")

/* // TODO Enable while deploying
router.use(express.static(path.join(__dirname, "../../client/dist/")));
 */

router.use("/public", express.static(path.join(__dirname, "../public")));

// Route to authenticate the users
router.use("/auth", require("./auth/auth"));

router.use(
  "/user",
  passport.authenticate("jwt", { session: false, failureRedirect: "/failure" }),
  require("./user")
);

router.use(
  "/post",
  passport.authenticate("jwt", { session: false, failureRedirect: "/failure" }),
  require("./posts")
);

router.use("/failure", (req, res, next) => {
  const error = new Error("User Not Found");
  error.statusCode = 401;
  next(error);
});

// TODO Enable while deploying
/* router.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
}); */

module.exports = router;
