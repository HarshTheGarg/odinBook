import React from "react";

function GoogleLogin() {
  
  const submitGoogleLogin = () => {
    // const response = await fetch("http://localhost:300/auth/google", {
    //   method: "POST"
    // });

    // if ( response.status === 200) {
    // const result = (await response).json()
    // console.log(result);
    // }
    // else if ( response.status === 401) {
    //   const result = await response.json();
    //   console.log(result);
    // } else {
    //   const result = await response.json();
    //   console.log(result);
    // }

    window.open("http://localhost:3000/auth/google", "_self");

  };

  return (
    <>
      <button onClick={submitGoogleLogin}>Google Login</button>
    </>
  );
}

export default GoogleLogin;
