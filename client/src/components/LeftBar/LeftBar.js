import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { startLoading } from "../../redux/features/loader/loaderSlice";

function LeftBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const findFriends = () => {
    if (location.pathname != "/friends/find") {
      dispatch(startLoading());
      navigate("/friends/find");
    }
  };

  const friendRequests = () => {
    if (location.pathname != "/friends/requests") {
      dispatch(startLoading());
      navigate("/friends/requests");
    }
  };

  const allFriends = () => {
    console.log("See all friends");
  };

  return (
    <>
      <aside className="leftBar">
        <ul>
          <li>
            <button onClick={findFriends}>Find Friends</button>
          </li>
          <li>
            <button onClick={friendRequests}>Friend Requests</button>
          </li>
          <li>
            <button onClick={allFriends}>Friends</button>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default React.memo(LeftBar);
