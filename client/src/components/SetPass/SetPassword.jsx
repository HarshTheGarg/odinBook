import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPassSet } from "../../redux/features/currentUser/cuSlice";

function SetPassword() {
  const navigate = useNavigate();
  const [newPass, setNewPass] = useState("");
  
  const newPasswordChange = (e) => {
    setNewPass(e.target.value);
  };

  const dispatch = useDispatch();

  const submit = () => {
    fetch("http://localhost:3000/user/password/change", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify({ password: newPass }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.success) {
          dispatch(setPassSet(true));
          navigate("/");
        } else {
          throw result;
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/Unauthorized");
      });
  };
  return (
    <>
      Enter new password:
      <input type="text" value={newPass} onChange={newPasswordChange} />
      <button onClick={submit}>Submit</button>
    </>
  );
}

export default SetPassword;
