import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Comments from "./Comments/Comments.jsx";

import profileImage from "../../../assets/userProfile.jpg";

function PostCard({ post }) {
  const state = useSelector((state) => state.cu);

  const navigate = useNavigate();

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const [timePassed, setTimePassed] = useState("");

  const likePost = () => {
    if (!liked) {
      setLikes((prevState) => prevState + 1);
      setLiked(true);
      fetch("http://localhost:3000/post/like", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "content-type": "application/json",
        },
        body: JSON.stringify({ postId: post._id }),
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (!result.success) {
            return result;
          }
        })
        .catch((err) => {
          if (err.status == 401) {
            navigate("/Unauthorized");
          }
          console.log(err);
        });
    } else {
      setLiked(false);
      setLikes((prevState) => prevState - 1);

      fetch("http://localhost:3000/post/unlike", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "content-type": "application/json",
        },
        body: JSON.stringify({ postId: post._id }),
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (!result.success) {
            return result;
          }
        })
        .catch((err) => {
          if (err.status == 401) {
            navigate("/Unauthorized");
          }
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setLikes(post.likes.length);

    if (post.likes && post.likes.length > 0) {
      post.likes.forEach((liker) => {
        if (liker._id == state.user._id) {
          setLiked(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    const timeInSeconds = (Date.now() - Date.parse(post.dateTime)) / 1000;

    if (Math.round(timeInSeconds) == 1) {
      setTimePassed("1 second ago");
    } else if (timeInSeconds < 60) {
      setTimePassed(Math.round(timeInSeconds) + " seconds ago");
    } else if (Math.round(timeInSeconds / 60) == 1) {
      setTimePassed("1 minute ago");
    } else if (timeInSeconds / 60 < 30) {
      setTimePassed(Math.round(timeInSeconds / 60) + " minutes ago");
    } else if (Math.round(timeInSeconds / (60 * 5)) * 5 < 60) {
      setTimePassed(Math.round(timeInSeconds / (60 * 5)) * 5 + " minutes ago");
    } else if (Math.round(timeInSeconds / (60 * 60)) == 1) {
      setTimePassed("1 hour ago");
    } else if (Math.round(timeInSeconds / (60 * 60 * 0.5)) * 0.5 == 1.5) {
      setTimePassed("1 hour 30 minutes ago");
    } else if (timeInSeconds / (60 * 60) < 24) {
      setTimePassed(Math.round(timeInSeconds / (60 * 60)) + " hours ago");
    } else if (Math.round(timeInSeconds / (60 * 60 * 24)) == 1) {
      setTimePassed("1 day ago");
    } else if (timeInSeconds / (60 * 60 * 24) < 3) {
      setTimePassed(Math.round(timeInSeconds / (60 * 60 * 24)) + " days ago");
    } else {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const date = new Date(post.dateTime);
      const minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      const hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();

      setTimePassed(
        `${date.getDate()} ${
          months[date.getMonth()]
        } ${date.getFullYear()} at ${hours}:${minutes}`
      );
    }
  }, []);

  return (
    <div className="postCard">
      <div className="author">
        <img
          src={post.author ? post.author.avatar : profileImage}
          alt="Author avatar"
          className="avatar"
        />
        <div className="authorDetails">
          <div className="authorName">
            {(post.author != null && post.author.username) || "user left"}
          </div>
          <div className="postTime">
            {/* new Date(Date.parse(post.dateTime)).toString() */} {timePassed}
          </div>
        </div>
      </div>
      <img alt="Post Image" className="postImage" src={post.postImageUrl} />
      <div>
        {post.caption}
        <button onClick={likePost}>{liked ? "Liked" : "Like"}</button> {likes}
      </div>
      <Comments comments={post.comments} postId={post._id} />
      <br />
      <br />
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.object,
};

export default PostCard;
