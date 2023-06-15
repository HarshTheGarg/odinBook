import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { endLoading, startLoading } from '../../redux/features/loader/loaderSlice';
import { logout } from '../../lib/authUtils';
import { removeUser } from '../../redux/features/currentUser/cuSlice';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(startLoading());
    logout();
    dispatch(removeUser());
    dispatch(endLoading());
    navigate("/");
  }, []);

  return (
    <></>
  );
}

export default Unauthorized;