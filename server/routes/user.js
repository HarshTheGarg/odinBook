const express = require("express");

const router = express.Router();

const User = require("../models/User");

const multer = require("multer");
const fs = require("fs");

router.get("/data", (req, res) => {
  const userDet = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    avatar: req.user.avatar,
  };
  const isPassSet = req.user.passwordHash ? true : false;
  res.json({ success: true, userDet, isPassSet: isPassSet });
});

router.use("/friends", require("./friends"));

router.use("/password", require("./password"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = `public/userAvatar/${req.user._id}`;
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, {recursive: true});
    }
    cb(null, folderName);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "." + file.originalname.split(".")[1]);
  },
});

const upload = multer({ storage: storage });

router.post("/uploadAvatar", upload.single("file"), async (req, res, next) => {
  const path = `http://localhost:3000/${req.file.path}`;

  const user = await User.findById(req.user._id);
  user.avatar = path;
  await user.save().catch((err) => {
    console.log(err);
    next(err);
  });

  res.json({ success: true, avatarPath: path });
});

module.exports = router;
