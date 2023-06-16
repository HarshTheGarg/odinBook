import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  endLoading,
  startLoading,
} from "../../../redux/features/loader/loaderSlice";

import PostCard from "../PostCard/PostCard.jsx";

function AllPosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [posts, setPosts ] = useState([]);

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
          setPosts(result.posts);
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

  return (<>
  <ul>
    {posts && posts.length > 0 && 
    posts.map((post) => {
      return <li key={post._id}><PostCard post={post}/> </li>;
    })}</ul>
  </>);
}

export default AllPosts;
