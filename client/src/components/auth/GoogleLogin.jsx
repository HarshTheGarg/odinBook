import React from "react";

import { useDispatch } from "react-redux";
import {startLoading } from "../../redux/features/loader/loaderSlice";

function GoogleLogin() {

  const dispatch = useDispatch();

  const submitGoogleLogin = () => {
    dispatch(startLoading());
    window.open("http://localhost:3000/auth/google", "_self");
  };

  return (
    <>
      <button onClick={submitGoogleLogin}>Google Login</button>
    </>
  );
}

export default React.memo(GoogleLogin);
