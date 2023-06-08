import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "../../components/auth/LoginForm/LoginForm";
import { endLoading } from "../../redux/features/loader/loaderSlice";

function SignIn() {
  const state = useSelector((state) => state.cu);

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(endLoading());
  }, []);

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
