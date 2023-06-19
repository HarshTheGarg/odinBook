const express = require("express");
const PostComment = require("../models/PostComment");
const Post = require("../models/Post");

const router = express.Router();

router.post("/add", async (req, res, next) => {
  const comment = new PostComment({
    author: req.user._id,
    caption: req.body.caption,
  });

  await comment.save().catch((err) => {
    console.log(err);
    next(err);
  });

  const post = await Post.findById(req.body.postId);

  post.comments.push(comment._id);

  post.save().catch((err) => {
    console.log(err);
    next(err);
  });

  res.json({ success: true });
});

module.exports = router;
