import React from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { endLoading, startLoading } from "../../../../redux/features/loader/loaderSlice";

function ListUser({ user, setRequestsList }) {

  const dispatch = useDispatch();

  const acceptRequest = () => {

    dispatch(startLoading());

    fetch("http://localhost:3000/user/friends/requests/accept", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify({ accepteeId: user._id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data.requestsList);
        setRequestsList(data.requestsList);
        dispatch(endLoading());
      })
      .catch((err) => {
        dispatch(endLoading());
        console.log(err);
      });
  };

  

  const rejectRequest = () => {
    dispatch(startLoading());

    fetch("http://localhost:3000/user/friends/requests/reject", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify({ rejecteeId: user._id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRequestsList(data.requestsList);
        dispatch(endLoading());
      })
      .catch((err) => {
        dispatch(endLoading());
        console.log(err);
      });
  };

  return (
    <>
      {user.username}
      <button onClick={acceptRequest}>Accept</button>
      <button onClick={rejectRequest}>Reject</button>
    </>
  );
}

ListUser.propTypes = {
  user: PropTypes.object,
  setRequestsList: PropTypes.func
};

export default ListUser;
