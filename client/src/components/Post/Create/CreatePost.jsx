import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { endLoading, startLoading } from "../../../redux/features/loader/loaderSlice";

function CreatePost() {
  const [caption, setCaption] = useState("");
  const [fileData, setFile] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeCaption = (e) => {
    setCaption(e.target.value);
  };

  const submitPost = (e) => {
    e.preventDefault();
    dispatch(startLoading());

    let formData = new FormData();
    formData.append("file", fileData);
    formData.append("caption", caption);

    fetch("http://localhost:3000/post/create", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: formData,
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

  /* 

  const onClickHandler = (e) => {
    e.preventDefault();


    fetch("http://localhost:3000/user/uploadAvatar", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        dispatch(setAvatar(result.avatarPath));
      });
  }; */

  const onFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  return (
    <>
      <div>CreatePost</div>
      <form>
        <input placeholder="Caption" onChange={changeCaption} />
        <input type="file" name="postImage" id="postImage" onChange={onFileChange}/>
        <button type="submit" onClick={submitPost}>
          Submit
        </button>
      </form>
    </>
  );
}

export default CreatePost;
