import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { endLoading } from "../../../redux/features/loader/loaderSlice";
import UsersList from "../../UsersList/UsersList";

function Requests() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(endLoading());
  }, []);
  return (
    <>
      Requests
      <UsersList />
    </>
  );
}

export default Requests;
