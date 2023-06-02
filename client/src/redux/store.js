import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import logger from "redux-logger";
import thunk from "redux-thunk";

import cuReducer from "./currentUser/cuReducer";

const store = createStore(
  cuReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

export default store;
