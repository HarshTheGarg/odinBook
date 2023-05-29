import React, { useState } from "react";

function SignIn() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitLogin(e) {
    e.preventDefault();
    // console.log({ username, pass });
    login();
  }

  const login = async () => {
    const data = {
      email,
      password,
    };

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const result = await response.json();
      console.log(result);

      const token = result.token;
      setLocalStorage(token);
      // console.log(token);
    }
  };

  const setLocalStorage = (token) => {
    localStorage.setItem("token", token);
  };

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

    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
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

  const goToProtected = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/protected", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": token
      },
    });

    console.log(response.status);
    // const result = await response.json();
    // console.log(result);
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
          onChange={emailUpdate}
        />
        <input
          type="password"
          name="password"
          id="loginPassword"
          placeholder="password"
          onChange={passUpdate}
        />
        <button onClick={submitLogin}>Submit</button>
      </form>

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

      <button onClick={goToProtected}>Protected</button>
    </>
  );
}

export default SignIn;
