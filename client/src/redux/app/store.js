import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import cuReducer from "../features/currentUser/cuSlice";
import mscReducer from "../features/mainSectionContent/mscSlice";
import loaderReducer from "../features/loader/loaderSlice";
import themeReducer from "../features/theme/themeSlice";

const store = configureStore({
  reducer: {
    cu: cuReducer,
    msc: mscReducer,
    loader: loaderReducer,
    theme: themeReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
