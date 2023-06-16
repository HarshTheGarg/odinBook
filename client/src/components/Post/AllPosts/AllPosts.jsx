import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import {
  endLoading,
  startLoading,
} from "../../../redux/features/loader/loaderSlice";
import { useNavigate } from "react-router-dom";

function AllPosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(startLoading());
    fetch("http://localhost:3000/post/all", {
      headers: {
        Authorization: localStorage.getItem("token"),
        "content-type": "application/json"
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.success) {
          console.log(result);
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

  return <div>AllPosts</div>;
}

export default AllPosts;
