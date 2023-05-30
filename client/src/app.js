import React from "react";
import SignIn from "./pages/SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Protect from "./pages/Protect";

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <br /><br/>
      <Routes>
        <Route path="/" exact element={<Home />} />

        <Route path="/signIn" exact element={<SignIn />} />
        
        <Route path="/protect" exact element={<Protect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
