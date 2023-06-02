import React from "react";
import { Navigate } from "react-router-dom";

import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import GoogleLogin from "../components/auth/GoogleLogin";
import { useSelector } from "react-redux";

function SignIn() {

  const state = useSelector((state) => state);

  if (!state.isLoggedIn) {
    return (
      <>
        <LoginForm />

        <RegisterForm />

        <GoogleLogin />
      </>
    );
  } else {
    return <Navigate to={"/"} />;
  }
}

export default React.memo(SignIn);
