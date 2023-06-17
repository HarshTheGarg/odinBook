import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
      post.likes.forEach((element) => {
        if (element._id == state.user._id) {
          setLiked(true);
        }
      });
    }
    
  }, []);

  return (
    <>
      <div>
        {post.caption} - {post.author.username}
      </div>
      <div>
        <button onClick={likePost}>{liked ? "Liked" : "Like"}</button> {likes}
      </div>
      <div>Comments:</div>
    </>
  );
}

PostCard.propTypes = {
  post: PropTypes.object,
};

export default PostCard;
