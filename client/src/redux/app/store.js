import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import cuReducer from "../features/currentUser/cuSlice";

const store = configureStore({
  reducer: {
    cu: cuReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
