import React from "react";
import { useSelector } from "react-redux";

import LeftBar from "../../components/LeftBar/LeftBar.jsx";
import RightBar from "../../components/RightBar/RightBar.jsx";
import MainSection from "../../components/MainSection/MainSection.jsx";
import NavBar from "../../components/Navbar/NavBar.jsx";

function Home() {
  const state = useSelector((state) => state.cu);

  if (state.isLoggedIn) {
    return (
      <>
        <NavBar />
        <div className="home">
          <LeftBar />
          <MainSection />
          <RightBar />
        </div>
      </>
    );
  }
}

export default React.memo(Home);
