import React from "react";

import LoginForm from "../../components/auth/LoginForm/LoginForm.jsx";
import { Outlet } from "react-router-dom";

function SignIn() {

    return (
      <>
        <div className="signIn">
          <LoginForm />
        </div>
        <Outlet />
      </>
    );
}

export default React.memo(SignIn);
