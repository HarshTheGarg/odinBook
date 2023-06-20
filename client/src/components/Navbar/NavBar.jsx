import React from "react";
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

  const submitLogout = () => {
    dispatch(startLoading());
    logout();

    dispatch(removeUser());
    dispatch(endLoading());

    navigate("/");
  };

  return (
    <>
      <nav>
        <Link className="link" to={"/"}>
          OdinBook
        </Link>
        {/* <ul>
          <li>
          </li>
        <li> */}
        <div className="userProfile">
          <img src={state.user.avatar || profileImage} alt="userProfile" />
          <div className="userpopup">
            <button onClick={submitLogout}>Logout</button>
          </div>
        </div>
        {/* </li>
        </ul> */}
      </nav>
    </>
  );
}

export default React.memo(NavBar);
