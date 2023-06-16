import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { endLoading, startLoading } from "../../../redux/features/loader/loaderSlice";

function CreatePost() {
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeCaption = (e) => {
    setCaption(e.target.value);
  };

  const submitPost = (e) => {
    e.preventDefault();
    dispatch(startLoading());

    fetch("http://localhost:3000/post/create", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify({ caption }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.success) {
          navigate("/");
        } else {
          throw result;
        }
      })
      .catch((err) => {
        if (err.status == 401) {
          dispatch(endLoading());
          navigate("/Unauthorized");
        }
        console.log(err);
      });
  };

  return (
    <>
      <div>CreatePost</div>
      <form>
        <input placeholder="Caption" onChange={changeCaption} />
        <button type="submit" onClick={submitPost}>
          Submit
        </button>
      </form>
    </>
  );
}

export default CreatePost;
