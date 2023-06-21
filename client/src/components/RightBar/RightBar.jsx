import React from "react";
import { useNavigate } from "react-router-dom";

function RightBar() {
  
  const navigate = useNavigate();

  const changePass = () => {
    navigate("/profile/passwordChange");
  };
  return (
    <aside className="rightBar">
      <ul>
        <li>
          <span onClick={changePass}>Change Password</span>
        </li>
      </ul>
    </aside>
  );
}

export default React.memo(RightBar);
