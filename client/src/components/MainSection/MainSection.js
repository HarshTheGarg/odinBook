import React from "react";
// import { useSelector } from "react-redux";
import UsersList from "../UsersList/UsersList";

import { useLocation } from "react-router-dom";

function MainSection() {
  // const state = useSelector((state) => state.msc);
  const location = useLocation();
  // console.log(location.pathname);

  return (
    <div className="mainSection">
      {location.pathname == "/findFriends" ? <UsersList /> : null}
    </div>
  );
}

export default React.memo(MainSection);
