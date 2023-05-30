import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../lib/authUtils";

import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import GoogleLogin from "../components/auth/GoogleLogin";

function SignIn() {
  const navigate = useNavigate();


  if ( !isLoggedIn()) {

    return (
      <>
        <LoginForm />

        <RegisterForm />

        <GoogleLogin />
      </>
    );
  } else {
    useEffect(() => {
      navigate("/");
    }, []);
  }
}

export default SignIn;
