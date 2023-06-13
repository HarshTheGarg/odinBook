import React from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import {
  endLoading,
  startLoading,
} from "../../../../redux/features/loader/loaderSlice";

function ListUser({ user, setFriendsList }) {
  const dispatch = useDispatch();

  const removeFriend = () => {
    dispatch(startLoading());
    console.log("Remove Friend");

    fetch("http://localhost:3000/user/friends/remove", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify({ removeeId: user._id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.success) {
          setFriendsList(result.friendsList);
          dispatch(endLoading());
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(endLoading());
      });
  };

  return (
    <>
      {user.username}
      <button onClick={removeFriend}>Remove</button>
    </>
  );
}

ListUser.propTypes = {
  user: PropTypes.object,
  setFriendsList: PropTypes.func,
};

export default ListUser;
