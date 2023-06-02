import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import logger from "redux-logger";
import cuReducer from "./currentUser/cuReducer";

const store = createStore(
  cuReducer,
  composeWithDevTools(applyMiddleware(logger))
);

export default store;
