import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { setTokenInLocalStorage } from "../../lib/authUtils";
import { setLogStatus } from "../../redux/";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

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

      dispatch(setLogStatus(true));
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

export default React.memo(RegisterForm);
