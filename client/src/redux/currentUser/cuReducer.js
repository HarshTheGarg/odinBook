import { isLoggedIn } from "../../lib/authUtils";
import { SET_LOG_STATUS } from "./cuTypes";

const initState = {
  isLoggedIn: isLoggedIn(),
};

const cuReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOG_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};

export default cuReducer;
