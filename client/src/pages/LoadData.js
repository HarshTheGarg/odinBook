import React, { useEffect } from "react";
import { tokenExists } from "../lib/authUtils";
import { fetchLoggedInUser } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function LoadData() {

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    if (tokenExists()) {
      console.log("Load data", "HO");
      dispatch(fetchLoggedInUser());
    }
  }, []);

  console.log("Load Data", state.isLoggedIn);

  if (state.isLoggedIn) {
    return <Navigate to={"/"} />;
  } else {
    return <Navigate to={"/signIn"} />;
  }
}

export default LoadData;
