import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Home() {
  const state = useSelector((state) => state.cu);

  if (state.isLoggedIn) {
    return <div>Protect {state.user.username}</div>;
  } else {
    return <Navigate to={"/signIn"} />;
  }
}

export default React.memo(Home);
