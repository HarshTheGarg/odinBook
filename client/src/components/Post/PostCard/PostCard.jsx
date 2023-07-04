import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Comments from "./Comments/Comments.jsx";

function PostCard({ post }) {
  const state = useSelector((state) => state.cu);

  const navigate = useNavigate();

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const likePost = () => {
    console.log(state.user);
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

  return (
    <div className="postCard">
      <div>
        {post.caption} - {(post.author != null && post.author.username) || "user left"}
      </div>
      <img alt="Post Image" className="postImage" src={post.postImageUrl}/>
      <div>
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
