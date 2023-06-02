import {
  SET_LOG_STATUS,
  USER_FETCH_FAILURE,
  USER_FETCH_REQUEST,
  USER_FETCH_SUCCESS,
  USER_REMOVE,
} from "./cuTypes";

let initState = {
  isLoggedIn: false,
  isLoading: false,
  user: {},
  error: "",
};

const cuReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOG_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case USER_REMOVE:
      return initState;
    case USER_FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        isLoggedIn: false,
        user: {},
        error: "",
      };
    case USER_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload,
        error: "",
      };
    case USER_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        user: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cuReducer;
