import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { endLoading } from '../../redux/features/loader/loaderSlice';
import { Outlet } from 'react-router-dom';

function User() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(endLoading());
  }, []);
  return (
    <Outlet />
  );
}

export default User;