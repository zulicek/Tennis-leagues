import { combineReducers } from "redux";
import { persistedSessionReducer } from "./sessionReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
    session: persistedSessionReducer,
    userData: userReducer
  });
