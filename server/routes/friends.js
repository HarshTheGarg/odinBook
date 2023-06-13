const User = require("../models/User");

const express = require("express");

const router = express.Router();

router.get("/find", async (req, res, next) => {
  const idList = [...req.user.friends, ...req.user.friendRequests];
  const result = await User.find(
    { _id: { $nin: idList }, email: { $ne: req.user.email } },
    ["_id", "username", "email"]
  )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      next(err);
    });
  res.status(200).json({
    success: true,
    usersList: result,
    friendsRequested: req.user.friendsRequested,
  });
});

router.get("/all", async (req, res, next) => {
  const result = await User.find(
    { _id: { $in: req.user.friends } },
    "_id username email"
  )
    .then((response) => {
      if (!response) {
        return null;
      } else {
        return response;
      }
    })
    .catch((err) => {
      next(err);
    });

  res.json({
    success: true,
    friendsList: result,
  });
});

router.post("/remove", async (req, res, next) => {
  const remover = await User.findById(req.user._id)
    .populate("friends", "_id username email")
    .then((response) => {
      if (!response) {
        const error = new Error("Authorization Error");
        error.statusCode = 401;
        next(error);
      } else {
        return response;
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });

  remover.friends = remover.friends.filter((friend) => {
    return !friend._id.equals(req.body.removeeId);
  });

  const removee = await User.findById(req.body.removeeId)
    .then((response) => {
      if (!response) {
        const error = new Error("Friend not found");
        error.statusCode = 404;
      } else {
        return response;
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });

  removee.friends = removee.friends.filter((id) => {
    return !id.equals(req.user._id);
  });

  remover.save().catch((err) => {
    console.log(err);
    next(err);
  });

  removee.save().catch((err) => {
    console.log(err);
    next(err);
  });

  res.json({
    success: true,
    friendsList: remover.friends,
  });
});

router.use("/requests", require("./requests"));

module.exports = router;
