import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Comments({ comments, postId }) {
  const navigate = useNavigate();

  const [commentsList, setCommentsList] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const inputChange = (e) => {
    setCommentInput(e.target.value);
  };

  const addComment = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/post/comment/add", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify({ postId, caption: commentInput }),
    })
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        if (result.success) {
          console.log(result);
        } else {
          throw result;
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/Unauthorized");
      });
    setCommentInput("");
  };

  useEffect(() => {
    // Fetch comments
    setCommentsList(comments);
  }, []);

  return (
    <>
      <div>Comments:</div>
      <ul>
        {commentsList &&
          commentsList.length > 0 &&
          commentsList.map((comment) => {
            console.log(comment);
            return <li key={comment._id}>{comment.caption}</li>;
          })}
      </ul>
      <input
        type="text"
        placeholder="Add Comment"
        onChange={inputChange}
        value={commentInput}
      />
      <button onClick={addComment}>Submit</button>
    </>
  );
}

Comments.propTypes = {
  comments: PropTypes.array,
  postId: PropTypes.string,
};

export default Comments;
