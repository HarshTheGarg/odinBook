import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import NavBar from "./components/Navbar/NavBar";
import Home from "./pages/Home/Home";
import Protect from "./pages/Protect";
import SignIn from "./pages/Signin/SignIn";
import OAuthRedirect from "./pages/OAuthRedirect";

import { tokenExists } from "./lib/authUtils";
import { fetchUser } from "./redux/features/currentUser/cuSlice";
import { Loader } from "./pages/Loader/Loader";

import "./sass/main.sass";
import { endLoading, startLoading } from "./redux/features/loader/loaderSlice";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cu);

  useEffect(() => {
    if (tokenExists() && (!state || !state.isLoggedIn)) {

      dispatch(startLoading());
      dispatch(fetchUser());
      dispatch(endLoading());
    }
  }, []);

  return (
    <BrowserRouter>
      <Loader />
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />

        <Route path="/signIn" exact element={<SignIn />} />

        <Route path="/protect" exact element={<Protect />} />

        <Route path="/OAuthRedirect" exact element={<OAuthRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default React.memo(App);
