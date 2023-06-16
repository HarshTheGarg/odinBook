import React, { useState } from "react";

function CreatePost() {

  const [caption, setCaption] = useState("");

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
      console.log(result);
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
