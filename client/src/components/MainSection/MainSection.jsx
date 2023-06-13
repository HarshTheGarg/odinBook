import React from "react";
import { Outlet } from "react-router-dom";

function MainSection() {

  return (
    <>
      <div className="mainSection">
        <Outlet />
      </div>
    </>
  );
}

export default React.memo(MainSection);
