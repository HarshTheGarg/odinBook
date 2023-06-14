const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({msg: "Working"});
})

router.get("/all", (req, res) => {
  res.json({success: true, msg: "All posts"});
})

module.exports = router;