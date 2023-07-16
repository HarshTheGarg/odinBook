import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function RightBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = useSelector((state) => state.cu);

  const changePassword = () => {
    if (location.pathname != "/profile/passwordChange") {
      navigate("/profile/passwordChange");
    }
  };

  const setPassword = () => {
    if (location.pathname != "/profile/passwordSet") {
      navigate("/profile/passwordSet");
    }
  };

  const changeProfileImage = () => {
    if (location.pathname != "/profile/imageChange") {
      navigate("/profile/imageChange");
    }
  };

  return (
    <aside className="rightBar">
      <ul>
        <li>
          {state.isPassSet ? (
            <button onClick={changePassword} className="btnSectionBtn">
              <span>Change Password</span>
            </button>
          ) : (
            <button onClick={setPassword} className="btnSectionBtn">
              <span>Set Password</span>
            </button>
          )}
        </li>
        <li>
          <button onClick={changeProfileImage} className="btnSectionBtn">
            <span>Change profile image</span>
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default React.memo(RightBar);
