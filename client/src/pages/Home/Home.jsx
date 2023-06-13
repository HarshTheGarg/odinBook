import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import LeftBar from "../../components/LeftBar/LeftBar.jsx";
import RightBar from "../../components/RightBar/RightBar.jsx";
import MainSection from "../../components/MainSection/MainSection.jsx";

function Home() {
  const state = useSelector((state) => state.cu);

  if (state.isLoggedIn) {
    return (
      <>
        <div className="home">
          <LeftBar />
          <MainSection />
          <RightBar />
        </div>
      </>
    );
  } else {
    return <Navigate to={"/signIn"} />;
  }
}

export default React.memo(Home);
