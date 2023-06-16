import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {

  const [caption, setCaption] = useState("");
  const navigate = useNavigate();

  const changeCaption = (e) => {
    setCaption(e.target.value);
  };

  const submitPost = (e) => {
    e.preventDefault();
    console.log(caption);
    fetch("http://localhost:3000/post/create", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "content-type": "application/json"
      },
      body: JSON.stringify({caption}),
    }).then((response) => {
      return response.json();
    }).then((result) => {
      if (result.success) {
        console.log(result);
      } else {
        throw result;
      }
    })
    .catch((err) => {
      if(err.status == 401) {
        navigate("/Unauthorized");
      }
      console.log(err);
    });
  };

  return (
    <>
      <div>CreatePost</div>
      <form>
        <input placeholder="Caption" onChange={changeCaption}/>
        <button type="submit" onClick={submitPost}>Submit</button>
      </form>
    </>
  );
}

export default CreatePost;
