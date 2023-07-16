import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { endLoading } from "../../redux/features/loader/loaderSlice.js";

import LeftBar from "../../components/LeftBar/LeftBar.jsx";
import RightBar from "../../components/RightBar/RightBar.jsx";
import MainSection from "../../components/MainSection/MainSection.jsx";
import NavBar from "../../components/Navbar/NavBar.jsx";

function Home() {
  const state = useSelector((state) => state.cu);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(endLoading());
  }, []);

  if (state.isLoggedIn) {
    return (
      <div className="theme-dark">
        <NavBar />
        <div className="home">
          <LeftBar />
          <MainSection />
          <RightBar />
        </div>
      </div>
    );
  }
}

export default React.memo(Home);
