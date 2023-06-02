import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setTokenInLocalStorage } from "../lib/authUtils";
import { setLogStatus } from "../redux/";

function OAuthRedirect() {
  const [param] = useSearchParams();
  const dispatch = useDispatch();
  // console.log(param.get("token"));
  setTokenInLocalStorage(param.get("token"), param.get("expires"));
  dispatch(setLogStatus(true));
  // window.location.reload();
  // console.log("here");
  // redirect();
  // window.open("http://localhost:5000/", "_self");
  return <Navigate to={"/"} />;
}

export default OAuthRedirect;
