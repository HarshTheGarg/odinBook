import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { endLoading, startLoading } from '../../redux/features/loader/loaderSlice';
import { logout } from '../../lib/authUtils';
import { removeUser } from '../../redux/features/currentUser/cuSlice';

function Unauthorized() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoading());
    logout();
    dispatch(removeUser());
    dispatch(endLoading());
  }, []);

  return (
    <div>Unauthorized access detected! Please LogIn again</div>
  );
}

export default Unauthorized;