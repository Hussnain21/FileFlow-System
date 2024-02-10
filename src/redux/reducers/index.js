import authReducer from "./authReducer";
import elementsReducer from "./elementsReducer";

import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authReducer,
  elements: elementsReducer,
});

export default rootReducer;
