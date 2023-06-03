import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/features/currentUser/cuSlice";

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

    dispatch(fetchUser(data));

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

  // );
}

export default React.memo(LoginForm);
