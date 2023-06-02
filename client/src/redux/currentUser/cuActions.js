import { SET_LOG_STATUS } from "./cuTypes";

export const setLogStatus = (flag) => {
  return {
    type: SET_LOG_STATUS,
    payload: flag,
  };
};
