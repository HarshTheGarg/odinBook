import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/features/currentUser/cuSlice";
import { endLoading, startLoading } from "../../redux/features/loader/loaderSlice";

import { logout } from "../../lib/authUtils";

function NavBar() {
  const navigate = useNavigate();

  const state = useSelector((state) => state.cu);
  const dispatch = useDispatch();

  const submitLogout = () => {

    dispatch(startLoading);
    logout();

    dispatch(removeUser());
    dispatch(endLoading);

    navigate("/");
  };

  const submitSingIn = () => {
    navigate("/signIn");
  };

  return (
    <>
      <nav>
        <Link className="link" to={"/"}>OdinBook</Link>
        <ul>
          <li>
            {state.isLoggedIn ? (
              <button onClick={submitLogout}>Logout</button>
            ) : (
              <button onClick={submitSingIn}>Sing in</button>
            )}
          </li>
          <br />
        </ul>
      </nav>
    </>
  );
}

export default React.memo(NavBar);
