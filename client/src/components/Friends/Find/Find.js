import React, { useEffect } from "react";
import UsersList from "../../UsersList/UsersList";
import { useDispatch } from "react-redux";
import { endLoading } from "../../../redux/features/loader/loaderSlice";

function Find() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(endLoading());
  }, []);
  
  return <UsersList />;
}

export default React.memo(Find);
