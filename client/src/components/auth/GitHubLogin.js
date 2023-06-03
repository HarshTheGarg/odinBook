import React from "react";

function GitHubLogin() {
  const submitGitHubLogin = () => {
    window.open("http://localhost:3000/auth/github", "_self");
  };
  return (
    <>
      <button onClick={submitGitHubLogin}>GitHub Login</button>
    </>
  );
}

export default GitHubLogin;
