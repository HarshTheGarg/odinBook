import React, { useState } from "react";
import PropTypes from "prop-types";
import { setTokenInLocalStorage } from "../../lib/authUtils";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("harsh@example.com"); //TODO remove the default
  const [password, setPassword] = useState("password"); //TODO remove the default
  const navigate = useNavigate();

  function submitLogin(e) {
    e.preventDefault();
    login();
  }

  const login = async () => {
    const data = {
      email,
      password,
    };

    const response = await fetch("http://localhost:3000/auth/local/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const result = await response.json();
      console.log(result);
      setTokenInLocalStorage(result.token, result.expires);
    }
    window.location.reload();
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

LoginForm.propTypes = {
  emailUpdate: PropTypes.func,
  passUpdate: PropTypes.func,
  submitLogin: PropTypes.func,
};

export default LoginForm;
