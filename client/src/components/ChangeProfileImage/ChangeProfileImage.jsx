import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAvatar } from "../../redux/features/currentUser/cuSlice";

function ChangeProfileImage() {
  const [fileData, setFile] = useState();
  const dispatch = useDispatch();

  const onClickHandler = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("file", fileData);

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
  };

  const onFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  return (
    <>
      <form>
        <input type="file" name="file" id="file" onChange={onFileChange} ></input>
        <button onClick={onClickHandler}>Submit</button>
      </form>
    </>
  );
}

export default ChangeProfileImage;
