const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Working" });
});

router.get("/all", (req, res) => {
  res.json({ success: true, msg: "All posts" });
});

router.post("/create", (req, res, next) => {
  console.log(req.body.caption);
  const post = new Post({
    caption: req.body.caption,
    author: req.user._id,
  });

  post.save().catch((err) => {
    console.log(err);
    next(err);
  });
  res.json({ success: true, post });
});

module.exports = router;
