import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginForm from "../components/auth/LoginForm";
import GoogleLogin from "../components/auth/GoogleLogin";
import GitHubLogin from "../components/auth/GitHubLogin";

function SignIn() {
  const state = useSelector((state) => state.cu);

  if (!state.isLoggedIn) {
    return (
      <>
        <LoginForm />

        <GoogleLogin />

        <GitHubLogin />
      </>
    );
  } else {
    return <Navigate to={"/"} />;
  }
}

export default React.memo(SignIn);
