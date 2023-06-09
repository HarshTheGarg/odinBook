import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function RightBar() {
  const state = useSelector((state) => state.cu);
  
  return (
    <aside className="rightBar">
      <ul>
        <li>
          {state.isPassSet ? (
            <Link to={"/profile/passwordChange"}>Change Password</Link>
          ) : (
            <Link to={"/profile/passwordSet"}>Set Password</Link>
          )}
        </li>
        <li>
          <Link to={"/profile/imageChange"} >Change profile image </Link>
        </li>
      </ul>
    </aside>
  );
}

export default React.memo(RightBar);
