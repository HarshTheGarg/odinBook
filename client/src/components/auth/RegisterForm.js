import React, { useState } from "react";
import PropTypes from "prop-types";
import { setTokenInLocalStorage } from "../../lib/authUtils";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("harsh@example.com"); //TODO remove the default
  const [password, setPassword] = useState("password"); //TODO remove the default

  const submitRegister = (e) => {
    e.preventDefault();
    register();
  };

  const register = async () => {
    const data = {
      username,
      email,
      password,
    };

    const response = await fetch("http://localhost:3000/auth/local/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const result = await response.json();
      // console.log(result);
      setTokenInLocalStorage(result.token);
    }
  };

  const nameUpdate = (e) => {
    setUsername(e.target.value);
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
        register:
        <input
          type="text"
          name="username"
          id="registerUsername"
          placeholder="username"
          onChange={nameUpdate}
        />
        <input
          type="email"
          name="email"
          id="registerEmail"
          placeholder="email"
          onChange={emailUpdate}
        />
        <input
          type="password"
          name="password"
          id="registerPassword"
          placeholder="password"
          onChange={passUpdate}
        />
        <button onClick={submitRegister}>Submit</button>
      </form>
    </>
  );
}

RegisterForm.propTypes = {
  nameUpdate: PropTypes.func,
  emailUpdate: PropTypes.func,
  passUpdate: PropTypes.func,
  submitRegister: PropTypes.func,
};

export default React.memo(RegisterForm);
