import React from "react";

import { useDispatch } from "react-redux";
import {startLoading } from "../../redux/features/loader/loaderSlice";

function GitHubLogin() {
  
  const dispatch = useDispatch();

  const submitGitHubLogin = () => {
    dispatch(startLoading());
    window.open("http://localhost:3000/auth/github", "_self");
  };

  return (
    <>
      <button onClick={submitGitHubLogin}>GitHub Login</button>
    </>
  );
}

export default React.memo(GitHubLogin);
