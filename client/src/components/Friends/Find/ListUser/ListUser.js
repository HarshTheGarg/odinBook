import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  endLoading,
  startLoading,
} from "../../../../redux/features/loader/loaderSlice";
function ListUser({ type, user }) {
  const [requested, setRequested] = useState(
    type == "requested" ? true : false
  );

  const dispatch = useDispatch();

  const request = () => {
    dispatch(startLoading());
    
    if (requested) {
      // Un-request
      // console.log("Un-Request");
      // setRequested(!requested);
      
      const data = {
        requesteeId: user._id,
      };
      fetch("http://localhost:3000/user/friends/cancelRequest", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "content-type": "application/json"
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status === 200) {
            dispatch(endLoading());
            setRequested(!requested);
            return response.json();
          }
          throw new Error("Server Error Find/ListUser.js");
        })
        .catch((err) => {
          console.log(err);
          dispatch(endLoading());
        });


    } else {
      // Request
      // console.log("Request");
      const data = {
        requesteeId: user._id,
      };
      fetch("http://localhost:3000/user/friends/makeRequest", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "content-type": "application/json"
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status === 200) {
            dispatch(endLoading());
            setRequested(!requested);
            return response.json();
          }
          throw new Error("Server Error Find/ListUser.js");
        })
        .catch((err) => {
          console.log(err);
          dispatch(endLoading());
        });
    }
  };

  return (
    <>
      {user.username}
      <button onClick={request} className={requested ? "requested" : null}>
        {requested ? "Requested" : "Request"}
      </button>
    </>
  );
}

ListUser.propTypes = {
  type: PropTypes.string,
  user: PropTypes.object,
};

export default ListUser;
