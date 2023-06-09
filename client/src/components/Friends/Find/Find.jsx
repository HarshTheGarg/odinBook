import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { endLoading } from "../../../redux/features/loader/loaderSlice";

import ListUser from "./ListUser/ListUser.jsx";
import { useNavigate } from "react-router-dom";

function Find() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [usersList, setUsersList] = useState([]);
  const [requestedFriends, setRequestedFriends] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/user/friends/find", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.success) {
          setUsersList(result.usersList);
          setRequestedFriends(result.friendsRequested);
          dispatch(endLoading());
        } else {
          throw result;
        }
      })
      .catch((err) => {
        if (err.status == 401) {
          navigate("/Unauthorized");
        }
        dispatch(endLoading());
        console.log(err);
      });
  }, []);

  return (
    <>
      Find Friends
      <ul>
        {usersList &&
          usersList.length > 0 &&
          usersList.map((user) => {
            if (requestedFriends.includes(user._id)) {
              return (
                <li key={user._id}>
                  <ListUser type="requested" user={user} />
                </li>
              );
            } else {
              return (
                <li key={user._id}>
                  <ListUser user={user} />
                </li>
              );
            }
          })}
      </ul>
    </>
  );
}

export default React.memo(Find);
