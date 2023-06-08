import React, { useEffect } from "react";
import UsersList from "../../UsersList/UsersList";
import { useDispatch } from "react-redux";
import { endLoading } from "../../../redux/features/loader/loaderSlice";

function Find() {
  const dispatch = useDispatch();

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
          console.log(result.usersList);
          console.log(result.friendsRequested);
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
      {/* <UsersList /> */}
    </>
  );
}

export default React.memo(Find);
