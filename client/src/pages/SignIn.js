import React from "react";

function SignIn() {
  function submit () {
    console.log("Submit");
  }
  return (
    <>
      <input type="text" name="username" id="username" placeholder="username"/>
      <input type="password" name="password" id="password" placeholder="password"/>
      <button onClick={submit}>Submit</button>
    </>
  );
}

export default SignIn;