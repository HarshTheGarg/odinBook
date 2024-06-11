import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../redux/features/currentUser/cuSlice";

import GoogleLogin from "../GoogleLogin.jsx";
import GitHubLogin from "../GitHubLogin.jsx";
import { startLoading } from "../../../redux/features/loader/loaderSlice";

function LoginForm() {
  const [email, setEmail] = useState("harsh@example.com"); //TODO remove the default
  const [password, setPassword] = useState("password"); //TODO remove the default

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const themeState = useSelector((state) => state.theme.theme);

  const [theme, setTheme] = useState(themeState);

  const updateColorScheme = (e) => {
    if (themeState == "automatic") {
      setTheme(e.matches ? "dark" : "light");
    }
  };
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

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
    
    navigate("/");
  };

  const emailUpdate = (e) => {
    setEmail(e.target.value);
  };

  const passUpdate = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (themeState == "automatic") {
      mediaQuery.addEventListener("change", updateColorScheme);
      setTheme(mediaQuery.matches ? "dark" : "light");
    } else {
      setTheme(themeState);
    }

    return () => {
      mediaQuery.removeEventListener("change", updateColorScheme);
    };
  }, [themeState]);

  return (
    <div className={`theme-${theme}`}>
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
    </div>
  );
}

export default React.memo(LoginForm);
