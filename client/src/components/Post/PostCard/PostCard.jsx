import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function PostCard({ post }) {
  const navigate = useNavigate();

  const [likes, setLikes] = useState(0);

  const likePost = () => {
    setLikes((prevState) => prevState + 1);
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
  };

  useEffect(() => {
    console.log(post);
    setLikes(post.likes.length);
  }, []);

  return (
    <>
      <div>
        {post.caption} - {post.author.username}
      </div>
      <div>
        <button onClick={likePost}>Like</button> {likes}
      </div>
      <div>Comments:</div>
    </>
  );
}

PostCard.propTypes = {
  post: PropTypes.object,
};

export default PostCard;
