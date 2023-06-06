import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginForm from "../../components/auth/LoginForm/LoginForm";


function SignIn() {
  const state = useSelector((state) => state.cu);

  if (!state.isLoggedIn) {
    return (
      <>
        <div className="signIn">
          <LoginForm />
        </div>
      </>
    );
  } else {
    return <Navigate to={"/"} />;
  }
}

export default React.memo(SignIn);
