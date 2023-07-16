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

  const createPost = () => {
    if (location.pathname != "/post/create") {
      navigate("/post/create");
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
          <li className="btnSectionList">
            <ul>
              <li>
                <button onClick={allPosts} className="btnSectionBtn">
                  <span>All Posts</span>
                </button>
              </li>
              <li>
                <button onClick={createPost} className="btnSectionBtn">
                  <span>Create Post</span>
                </button>
              </li>
            </ul>
          </li>

          <div className="divider"></div>

          <li className="btnSectionList">
            <ul>
              <li>
                <button onClick={findFriends} className="btnSectionBtn">
                  <span>Find Friends</span>
                </button>
              </li>
              <li>
                <button onClick={friendRequests} className="btnSectionBtn">
                  <span>Friend Requests</span>
                </button>
              </li>
              <li>
                <button onClick={allFriends} className="btnSectionBtn">
                  <span>Friends</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default React.memo(LeftBar);
