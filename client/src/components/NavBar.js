import React, { useState } from "react";
import { isLoggedIn, logout } from "../lib/authUtils";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [logStatus, setLogStatus] = useState(isLoggedIn());
  const navigate = useNavigate();

  const submitLogout = () => {
    setLogStatus(!logStatus);
    logout();
    window.location.reload();
    navigate("/");
  };

  const submitSingIn = () => {
    navigate("/signIn");
  };

  const protectedRoute = () => {
    navigate("/protect");
  };

  return (
    <>
      <div>NavBar</div>
      <div>
        {logStatus ? (
          <button onClick={submitLogout}>Logout</button>
        ) : (
          <button onClick={submitSingIn}>Sing in</button>
        )}
      </div>

      <button onClick={protectedRoute}>Protected</button>
      <br />
    </>
  );
}

export default NavBar;
