import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RightBar() {
  const navigate = useNavigate();

  const [passwordSet, setPasswordSet] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/user/password/isSet", {
      headers: {
        Authorization: localStorage.getItem("token"),
        "content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.success) {
          result.isSet ? setPasswordSet(true) : setPasswordSet(false);
        } else {
          return result;
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/Unauthorized");
      });
  }, []);

  return (
    <aside className="rightBar">
      <ul>
        <li>
          {passwordSet ? (
            <Link to={"/profile/passwordChange"}>Change Password</Link>
          ) : (
            <Link to={"/profile/passwordSet"}>Set Password</Link>
          )}
        </li>
      </ul>
    </aside>
  );
}

export default React.memo(RightBar);
