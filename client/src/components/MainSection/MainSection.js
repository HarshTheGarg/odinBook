import React from "react";
import { useSelector } from "react-redux";
import UsersList from "../UsersList/UsersList";

function MainSection() {
  const state = useSelector((state) => state.msc);

  return (
    <div className="mainSection">
      {state.content == "findFriends" ? <UsersList/> : null}
    </div>
  );
}

export default React.memo(MainSection);
