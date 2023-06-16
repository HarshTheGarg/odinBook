const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Working" });
});

router.get("/all", async (req, res) => {
  await Post.find({"author": {$in: [...req.user.friends, req.user._id]}})
    .sort({"dateTime": -1})
    .populate("author", "email username")
    .then((result) => {
      res.json({ success: true, posts: result });
    });
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
