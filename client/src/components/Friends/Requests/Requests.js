import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { endLoading } from "../../../redux/features/loader/loaderSlice";
import ListUser from "./ListUser/ListUser";

function Requests() {
  const dispatch = useDispatch();

  const [requestsList, setRequestsList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/user/friends/requests/all", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.success) {
          setRequestsList(result.requestsList);
          dispatch(endLoading());
        } else {
          throw result;
        }
      })
      .catch((err) => {
        dispatch(endLoading());
        console.log(err);
      });
  }, []);

  return (
    <>
      Requests:
      <ul>
        {requestsList &&
          requestsList.length > 0 &&
          requestsList.map((user) => {
            return (
              <li key={user._id}>
                <ListUser user={user} setRequestsList={setRequestsList} />
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default React.memo(Requests);
