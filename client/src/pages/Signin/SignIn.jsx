import React from "react";
import { useSelector } from "react-redux";

import LoginForm from "../../components/auth/LoginForm/LoginForm.jsx";

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
  }
}

export default React.memo(SignIn);
