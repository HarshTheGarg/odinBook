const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/make", async (req, res, next) => {
  // console.log("=========", req.body);
  const requester = await User.findById(req.user._id)
    .then((response) => {
      if (!response) {
        next(new Error("User Not Found"));
      }
      return response;
    })
    .catch((err) => {
      next(err);
    });
  requester.friendsRequested.push(req.body.requesteeId);
  // requester.friendsRequested = [req.body.requesteeId];
  requester.save().catch((err) => {
    console.log(err);
    next(err);
  });

  const requestee = await User.findById(req.body.requesteeId)
    .then((response) => {
      if (!response) {
        // console.log("SDFSDFSDFSDFSDF");
        next(new Error("User Not Found"));
      }
      return response;
    })
    .catch((err) => {
      next(err);
    });
  requestee.friendRequests.push(req.user._id);
  // requestee.friendRequests = [req.user._id];
  requestee.save().catch((err) => {
    console.log(err);
    next(err);
  });

  res.json({
    success: true,
  });
});

router.post("/cancel", async (req, res, next) => {
  // console.log("=========", req.body);
  const requester = await User.findById(req.user._id)
    .then((response) => {
      if (!response) {
        next(new Error("User Not Found"));
      }
      // console.log(response);
      return response;
    })
    .catch((err) => {
      next(err);
    });
  requester.friendsRequested = requester.friendsRequested.filter((id) => {
    return !(id.equals(req.body.requesteeId))
  });
  // requester.friendsRequested = [req.body.requesteeId];
  requester.save().catch((err) => {
    console.log(err);
    next(err);
  });

  const requestee = await User.findById(req.body.requesteeId)
    .then((response) => {
      if (!response) {
        // console.log("SDFSDFSDFSDFSDF");
        next(new Error("User Not Found"));
      }
      return response;
    })
    .catch((err) => {
      next(err);
    });
  requestee.friendRequests = requestee.friendRequests.filter((id) => {
    return !(id.equals(req.user._id));
  });
  // requestee.friendRequests = [req.user._id];
  requestee.save().catch((err) => {
    console.log(err);
    next(err);
  });

  res.json({
    success: true,
  });
});

router.get("/all", async (req, res, next) => {
  const response = await User.findById(req.user._id, ["friendRequests"])
    .populate("friendRequests", "_id username email")
    .then((resp) => {
      if (!resp) {
        next(new Error("Some error occurred friends.js"));
      } else {
        return resp;
      }
    })
    .catch((err) => {
      next(err);
    });

  res.json({ success: true, requestsList: response.friendRequests });
});

router.post("/accept", async (req, res, next) => {
  if (req.user.friendRequests.includes(req.body.accepteeId)) {
    // console.log(req.body.accepteeId);

    const accepter = await User.findById(req.user._id)
      .populate("friendRequests", "_id username email")
      .then((response) => {
        if (!response) {
          throw new Error("Authorization Error");
        }
        return response;
      })
      .catch((err) => {
        next(err);
      });

    accepter.friends.push(req.body.accepteeId);
    accepter.friendRequests = accepter.friendRequests.filter((friend) => {
      return !(friend._id.equals(req.body.accepteeId))
    });

    const acceptee = await User.findById(req.body.accepteeId)
      .then((response) => {
        if (!response) {
          throw new Error("Authorization Error");
        }
        return response;
      })
      .catch((err) => {
        next(err);
      });

    acceptee.friends.push(req.user._id);
    acceptee.friendsRequested = acceptee.friendsRequested.filter((id) => {
      return !(id.equals(accepter._id));
    });

    accepter.save().catch((err) => {
      console.log(err);
      next(err);
    });

    acceptee.save().catch((err) => {
      console.log(err);
      next(err);
    });

    // console.log(accepter.friendRequests);

    res.json({ success: true, requestsList: accepter.friendRequests });
  }
});

module.exports = router;
