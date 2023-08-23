import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { endLoading } from "../../redux/features/loader/loaderSlice.js";

import LeftBar from "../../components/LeftBar/LeftBar.jsx";
import RightBar from "../../components/RightBar/RightBar.jsx";
import MainSection from "../../components/MainSection/MainSection.jsx";
import NavBar from "../../components/Navbar/NavBar.jsx";

function Home() {
  const state = useSelector((state) => state.cu);
  const dispatch = useDispatch();

  const themeState = useSelector((state) => state.theme.theme);

  const [theme, setTheme] = useState(themeState);

  const updateColorScheme = (e) => {
    if (themeState == "automatic") {
      setTheme(e.matches ? "dark" : "light");
    }
  };
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  useEffect(() => {
    if (themeState == "automatic") {
      mediaQuery.addEventListener("change", updateColorScheme);
      setTheme(mediaQuery.matches ? "dark" : "light");
    } else {
      setTheme(themeState);
    }

    return () => {
      mediaQuery.removeEventListener("change", updateColorScheme);
    };
  }, [themeState]);

  useEffect(() => {
    dispatch(endLoading());
  }, []);

  if (state.isLoggedIn) {
    return (
      <div className={`theme-${theme}`}>

        <div className="complete">
          <NavBar />
          <div className="home">
            <LeftBar />
            <MainSection />
            <RightBar />
          </div>
        </div>  
      </div>
    );
  }
}

export default React.memo(Home);
