import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { endLoading } from "../../../redux/features/loader/loaderSlice";

function AllPosts() {

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:3000/post/all")
      .then((response) => {
        return response.json();
      }).then((result) => {
        console.log(result);
      });
    dispatch(endLoading());
  }, []);

  return <div>AllPosts</div>;
}

export default AllPosts;
