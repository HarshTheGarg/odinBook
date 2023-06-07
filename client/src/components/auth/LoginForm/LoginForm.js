import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchUser } from "../../../redux/features/currentUser/cuSlice";

import GoogleLogin from "../GoogleLogin";
import GitHubLogin from "../GitHubLogin";
import { endLoading, startLoading } from "../../../redux/features/loader/loaderSlice";

function LoginForm() {
  const [email, setEmail] = useState("harsh@example.com"); //TODO remove the default
  const [password, setPassword] = useState("password"); //TODO remove the default

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function submitLogin(e) {
    e.preventDefault();
    login();
  }

  const login = async () => {
    const data = {
      email,
      password,
    };

    dispatch(startLoading());
    dispatch(fetchUser(data));
    dispatch(endLoading());
    
    navigate("/");
  };

  const emailUpdate = (e) => {
    setEmail(e.target.value);
  };

  const passUpdate = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="loginForm">
        <form action="">
          <div className="inputs">
            <input
              type="email"
              name="email"
              id="loginEmail"
              placeholder="email"
              onChange={emailUpdate}
            />
            <input
              type="password"
              name="password"
              id="loginPassword"
              placeholder="password"
              onChange={passUpdate}
            />
          </div>
          <button onClick={submitLogin}>Submit</button>
        </form>
        <div className="socialLogin">
          <GoogleLogin />
          <GitHubLogin />
        </div>
      </div>
    </>
  );
}

export default React.memo(LoginForm);
