const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

const multer = require("multer");
const fs = require("fs");

router.get("/", (req, res) => {
  res.json({ msg: "Working" });
});

router.get("/all", async (req, res) => {
  await Post.find({ author: { $in: [...req.user.friends, req.user._id] } })
    .sort({ dateTime: -1 })
    .populate("author", "email username avatar")
    .populate("likes", "username")
    .populate({
      path: "comments",
      populate: { path: "author", select: "email username avatar" },
    })
    .then((result) => {
      res.json({ success: true, posts: result });
    });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = `public/posts/${req.user._id}`;
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
    cb(null, folderName);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "." + file.originalname.split(".")[1]);
  },
});

const upload = multer({ storage: storage });

router.post("/create", upload.single("file"), (req, res, next) => {
  const path = `http://localhost:3000/${req.file.path}`;
  const post = new Post({
    caption: req.body.caption,
    author: req.user._id,
    postImageUrl: path
  });

  post.save().catch((err) => {
    console.log(err);
    next(err);
  });
  res.json({ success: true });
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

router.post("/unlike", async (req, res, next) => {
  const post = await Post.findById(req.body.postId);

  post.likes = post.likes.filter((id) => {
    return !id.equals(req.user._id);
  });

  post
    .save()
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      next(err);
    });
});

router.use("/comment", require("./comment"));

module.exports = router;
