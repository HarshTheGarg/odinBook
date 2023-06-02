import { setTokenInLocalStorage } from "../../lib/authUtils";
import {
  SET_LOG_STATUS,
  USER_FETCH_FAILURE,
  USER_FETCH_REQUEST,
  USER_FETCH_SUCCESS,
  USER_REMOVE,
} from "./cuTypes";

export const setLogStatus = (flag) => {
  return {
    type: SET_LOG_STATUS,
    payload: flag,
  };
};

export const fetchUserRequest = () => {
  return {
    type: USER_FETCH_REQUEST,
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: USER_FETCH_SUCCESS,
    payload: user,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: USER_FETCH_FAILURE,
    payload: error,
  };
};

export const userLogout = () => {
  return {
    type: USER_REMOVE,
  };
};

export const fetchLoginUser = (data) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    fetch("http://localhost:3000/auth/local/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
          // console.log(result);
        }
        throw new Error("Authorization error");
      })
      .then((result) => {
        setTokenInLocalStorage(result.token, result.expires);
        dispatch(fetchUserSuccess(result.user));
      })
      .catch((err) => {
        dispatch(fetchUserFailure(err));
      });
  };
};

export const fetchLoggedInUser = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest());

    fetch("http://localhost:3000/userData", {
      headers: {
        Authorization: localStorage.getItem("token"),
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error("Authorization Error");
      })
      .then((result) => {
        dispatch(fetchUserSuccess(result.user));
      })
      .catch((err) => {
        dispatch(fetchUserFailure(err));
      });
  };
};
