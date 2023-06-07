import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import cuReducer from "../features/currentUser/cuSlice";
import mscReducer from "../features/mainSectionContent/mscSlice";

const store = configureStore({
  reducer: {
    cu: cuReducer,
    msc: mscReducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
