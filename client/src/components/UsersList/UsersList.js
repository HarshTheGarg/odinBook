import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import {
  endLoading,
  startLoading,
} from "../../redux/features/loader/loaderSlice";

function UsersList() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Get list of users
    dispatch(startLoading());
    fetch("http://localhost:3000/user/allUsers", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error("Authorization Error, USERSLIST.JS");
      })
      .then((result) => {
        if (result.success) {
          // console.log(result.usersList);
          setUsers(result.usersList);
          dispatch(endLoading());
        } else {
          throw new Error("Authorization Error, USERSLIST.JS");
        }
      })
      .catch((err) => {
        console.log(err);
        setUsers([]);
        dispatch(endLoading());
      });
  }, []);

  return (
    <>
      <div className="usersList">
        <ul>
          {users &&
            users.length > 0 &&
            users.map((user) => {
              return <li key={user._id}>{user.username}</li>;
            })}
        </ul>
      </div>
    </>
  );
}

export default UsersList;
