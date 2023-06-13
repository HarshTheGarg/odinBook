import React, { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setTokenInLocalStorage } from "../lib/authUtils";
import { fetchUser } from "../redux/features/currentUser/cuSlice";

function OAuthRedirect() {
  const [param] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setTokenInLocalStorage(param.get("token"), param.get("expires"));
    dispatch(fetchUser());
  }, []);

  return <Navigate to={"/"} />;
}

export default OAuthRedirect;
