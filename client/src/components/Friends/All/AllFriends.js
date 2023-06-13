import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { endLoading } from "../../../redux/features/loader/loaderSlice";
import ListUser from "./ListUser/ListUser";

function AllFriends() {
  const dispatch = useDispatch();

  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/user/friends/all", {
      headers: {
        Authorization: localStorage.getItem("token"),
        "content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.success) {
          setFriendsList(result.friendsList);
          dispatch(endLoading());
        } else {
          throw result;
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(endLoading());
      });
  }, []);

  return (
    <>
      All Friends
      <ul>
        {friendsList &&
          friendsList.length > 0 &&
          friendsList.map((user) => {
            return (
              <li key={user._id}>
                <ListUser user={user} setFriendsList={setFriendsList} />
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default AllFriends;
