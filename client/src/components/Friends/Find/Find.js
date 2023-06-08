import React, { useEffect, useState } from "react";
// import UsersList from "../../UsersList/UsersList";
import { useDispatch } from "react-redux";
import { endLoading } from "../../../redux/features/loader/loaderSlice";
import ListUser from "./ListUser/ListUser";

function Find() {
  const dispatch = useDispatch();

  const [usersList, setUsersList] = useState([]);
  const [requestedFriends, setRequestedFriends] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/user/friends/find", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error("Authorization Error");
      })
      .then((result) => {
        if (result.success) {
          setUsersList(result.usersList);
          setRequestedFriends(result.friendsRequested);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(endLoading());
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
            }else{
              return (
                <li key={user._id}>
                  <ListUser user={user}/>
                </li>
              );
            }
          })}
      </ul>
    </>
  );
}

export default React.memo(Find);
