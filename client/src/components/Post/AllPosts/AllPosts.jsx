import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { endLoading } from "../../../redux/features/loader/loaderSlice";

function AllPosts() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(endLoading());
  }, []);

  return <div>AllPosts</div>;
}

export default AllPosts;
