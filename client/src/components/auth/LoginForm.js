import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginUser } from "../../redux/";

function LoginForm() {
  const [email, setEmail] = useState("harsh@example.com"); //TODO remove the default
  const [password, setPassword] = useState("password"); //TODO remove the default

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  function submitLogin(e) {
    e.preventDefault();
    login();
  }

  const login = async () => {
    const data = {
      email,
      password,
    };

    /* const response = await fetch("http://localhost:3000/auth/local/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const result = await response.json();
      // console.log(result);
      setTokenInLocalStorage(result.token, result.expires);
      
      dispatch(setLogStatus(true));
    } */

    dispatch(fetchLoginUser(data));
    // window.location.reload();
    navigate("/");
  };

  const emailUpdate = (e) => {
    setEmail(e.target.value);
  };

  const passUpdate = (e) => {
    setPassword(e.target.value);
  };

  // return (
  if (state.isLoading) {
    console.log("Loading");
    return <h3> Loading </h3>;
  } else {
    return (
      <>
        <form action="">
          login:
          <input
            type="email"
            name="email"
            id="loginEmail"
            placeholder="email"
            value="harsh@example.com"
            onChange={emailUpdate}
          />
          <input
            type="password"
            name="password"
            id="loginPassword"
            placeholder="password"
            value="password"
            onChange={passUpdate}
          />
          <button onClick={submitLogin}>Submit</button>
        </form>
      </>
    );
  }

  // );
}

export default React.memo(LoginForm);
