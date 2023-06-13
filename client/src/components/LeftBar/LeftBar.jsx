import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { startLoading } from "../../redux/features/loader/loaderSlice";

function LeftBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const allPosts = () => {
    if (location.pathname != "/") {
      dispatch(startLoading());
      navigate("/");
    }
  };

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
    if (location.pathname != "/friends/all") {
      dispatch(startLoading());
      navigate("/friends/all");
    }
  };

  return (
    <>
      <aside className="leftBar">
        <ul>
          <li>
            Posts
            <ul>
              <li>
                <button onClick={allPosts}>All Posts</button>
              </li>
            </ul>
          </li>
          <li>
            Friends
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
          </li>
        </ul>
      </aside>
    </>
  );
}

export default React.memo(LeftBar);
