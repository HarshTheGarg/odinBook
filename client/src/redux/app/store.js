import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import cuReducer from "../features/currentUser/cuSlice";
import mscReducer from "../features/mainSectionContent/mscSlice";
import loaderReducer from "../features/loader/loaderSlice";

const store = configureStore({
  reducer: {
    cu: cuReducer,
    msc: mscReducer,
    loader: loaderReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
