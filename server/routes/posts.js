const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Working" });
});

router.get("/all", async (req, res) => {
  await Post.find({ author: { $in: [...req.user.friends, req.user._id] } })
    .sort({ dateTime: -1 })
    .populate("author", "email username")
    .populate("likes", "username")
    .then((result) => {
      res.json({ success: true, posts: result });
    });
});

router.post("/create", (req, res, next) => {
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

router.post("/like", async (req, res, next) => {
  const post = await Post.findById(req.body.postId);
  post.likes.push(req.user._id);

  post
    .save()
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
