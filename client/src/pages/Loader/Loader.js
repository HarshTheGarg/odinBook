import React from "react";
import { useSelector } from "react-redux";

export const Loader = () => {
  const state = useSelector((state) => state.cu);

  if (state.isLoading) {
    return (
      <div className="loading">
        <div className="loader">Loading...</div>
      </div>
    );
  }
};
