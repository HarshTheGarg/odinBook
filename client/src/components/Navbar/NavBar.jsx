import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/features/currentUser/cuSlice";
import {
  endLoading,
  startLoading,
} from "../../redux/features/loader/loaderSlice";

import { logout } from "../../lib/authUtils";

import profileImage from "../../assets/userProfile.jpg";
import { setTheme } from "../../redux/features/theme/themeSlice";

function NavBar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.cu);
  const theme = useSelector((state) => state.theme.theme);

  const [themeSelected, setThemeSelected] = useState(false);

  const submitLogout = () => {
    dispatch(startLoading());
    logout();

    dispatch(removeUser());
    dispatch(endLoading());

    navigate("/");
  };

  const submitTheme = () => {
    setThemeSelected(!themeSelected);
  };

  const changeTheme = (e) => {
    dispatch(setTheme(e.target.value));
  };

  return (
    <>
      <nav>
        <Link className="link" to={"/"}>
          OdinBook
        </Link>

        <div className="userProfile">
          <img
            src={currentUser.user.avatar || profileImage}
            alt="userProfile"
          />

          <ul className="userpopup">
            {!themeSelected ? (
              <>
                <li>
                  <button onClick={submitLogout}>
                    <span>Logout</span>
                  </button>
                </li>
                <li>
                  <button onClick={submitTheme}>
                    <span>Theme</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="themeSelector">
                  <button
                    className={theme == "light" ? "selected" : undefined}
                    onClick={changeTheme}
                    value={"light"}
                  >
                    Light
                  </button>
                  <button
                    onClick={changeTheme}
                    value={"dark"}
                    className={theme == "dark" ? "selected" : undefined}
                  >
                    Dark
                  </button>
                  <button
                    onClick={changeTheme}
                    value={"automatic"}
                    className={theme == "automatic" ? "selected" : undefined}
                  >
                    Automatic
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default React.memo(NavBar);
