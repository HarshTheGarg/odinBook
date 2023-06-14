// Require express and make router
const express = require("express");
const router = express.Router();

// TODO Enable while deploying
/* const path = require("path")
router.use(express.static(path.join(__dirname, "../../client/dist/")));
 */

// Route to authenticate the users
router.use("/auth", require("./auth/auth"));

// Test route to be deleted
router.get("/test", (req, res) => {
  res.json({ msg: "I am a test" });
});

router.use("/user", require("./user"));

router.use("/post", require("./posts"));

// TODO Enable while deploying
/* router.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
}); */

module.exports = router;
