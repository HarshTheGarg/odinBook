import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [correct, setCorrect] = useState(true);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const navigate = useNavigate();

  const currentPasswordChange = (e) => {
    setOldPass(e.target.value);
    fetch("http://localhost:3000/user/password/verify", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify({ password: e.target.value }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.success) {
          setCorrect(result.isValid);
        } else {
          return result;
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/Unauthorized");
      });
  };

  const newPasswordChange = (e) => {
    setNewPass(e.target.value);
  };

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
      <div>Enter current password</div>
      <input
        type="text"
        placeholder="password"
        value={oldPass}
        onChange={currentPasswordChange}
      />
      {correct ? "Match" : "No Match"}
      <div>
        {correct && (
          <>
            Enter new password:
            <input type="text" value={newPass} onChange={newPasswordChange} />
            <button onClick={submit}>Submit</button>
          </>
        )}
      </div>
    </>
  );
}

export default ChangePassword;
