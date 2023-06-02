import React from "react";
import { logout } from "../lib/authUtils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/";

function NavBar() {
  const navigate = useNavigate();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const submitLogout = () => {
    logout();
    
    dispatch(userLogout(false));

    navigate("/");
  };

  const submitSingIn = () => {
    navigate("/signIn");
  };

  const protectedRoute = async () => {
    navigate("/protect");
  };

  const homeRoute = () => {
    navigate("/");
  };



  return (
    <>
      <div>NavBar</div>
      <div>
        {state.isLoggedIn ? (
          <button onClick={submitLogout}>Logout</button>
        ) : (
          <button onClick={submitSingIn}>Sing in</button>
        )}
      </div>

      <button onClick={protectedRoute}>Protected</button>
      <button onClick={homeRoute}>Home</button>
      <br />
    </>
  );
}

export default React.memo(NavBar);
