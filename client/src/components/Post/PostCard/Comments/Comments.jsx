import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "react-redux";
import { useSelector } from "react-redux";

function Comments({ comments, postId }) {
  const navigate = useNavigate();

  const [commentsList, setCommentsList] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const cu = useSelector((state) => {
    return state.cu.user;
  });

  const inputChange = (e) => {
    setCommentInput(e.target.value);
  };

  const addComment = (e) => {
    e.preventDefault();
    if (commentInput) {
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
            window.location.reload();
            // setCommentsList(result.comments);
            // console.log(result.comments);
          } else {
            throw result;
          }
        })
        .catch((err) => {
          console.log(err);
          // navigate("/Unauthorized");
        });
      setCommentInput("");
    } else {
      console.log(commentsList);
    }
  };

  useEffect(() => {
    // Fetch comments
    setCommentsList(comments);
  }, []);

  return (
    <div className="commentContainer">
      <ul className="commentsList">
        {commentsList &&
          commentsList.length > 0 &&
          commentsList.map((comment) => {
            return (
              <li key={comment._id} className="comment">
                <img
                  src={
                    comment.author != null ? comment.author.avatar : undefined
                  }
                  alt="Author Avatar"
                />
                <div className="text">
                  <div className="authorName">
                    {(comment.author != null
                      ? comment.author.username
                      : undefined) || "user left"}
                  </div>
                  <div className="caption">{comment.caption}</div>
                </div>
              </li>
            );
          })}
      </ul>
      <div className="newComment">
        <input
          className="inputBox"
          type="text"
          placeholder="Add Comment"
          onChange={inputChange}
          value={commentInput}
        />
        <button onClick={addComment} className="submitBtn">
          Submit
        </button>
      </div>
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.array,
  postId: PropTypes.string,
};

export default Comments;
