import React from "react";

function GoogleLogin() {
  const submitGoogleLogin = () => {
    window.open("http://localhost:3000/auth/google", "_self");
  };

  return (
    <>
      <button onClick={submitGoogleLogin}>Google Login</button>
    </>
  );
}

export default React.memo(GoogleLogin);
