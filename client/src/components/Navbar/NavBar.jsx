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

function NavBar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const state = useSelector((state) => state.cu);
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

  return (
    <>
      <nav>
        <Link className="link" to={"/"}>
          OdinBook
        </Link>

        <div className="userProfile">
          <img src={state.user.avatar || profileImage} alt="userProfile" />

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
                  <button className="selected">
                    <span>Light</span>
                  </button>
                  <button>
                    <span>Dark</span>
                  </button>
                  <button>
                    <span>Automatic</span>
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
