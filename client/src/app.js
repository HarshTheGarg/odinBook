import React, { useEffect } from "react";
import SignIn from "./pages/SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Protect from "./pages/Protect";
import OAuthRedirect from "./pages/OAuthRedirect";
import { tokenExists } from "./lib/authUtils";
import { fetchLoggedInUser } from "./redux";

function App() {

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    if (tokenExists() && ((typeof state == "undefined") || !state.isLoggedIn)) {
      dispatch(fetchLoggedInUser());
    }
  }, []);

  return (
      <BrowserRouter>
        <NavBar />
        <br />
        <br />
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
