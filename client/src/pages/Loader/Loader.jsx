import React from "react";
import { useSelector } from "react-redux";

function Loader() {
  const state = useSelector((state) => state.loader);

  if (state.isLoading) {
    return (
      <div className="loading">
        <div className="loader">Loading...</div>
      </div>
    );
  }
};

export default Loader;
