import React from "react";
import SignIn from "./pages/SignIn";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Protect from "./pages/Protect";
import OAuthRedirect from "./pages/OAuthRedirect";


function App() {
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

export default App;
