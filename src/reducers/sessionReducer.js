import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.user,
        token: action.token,
        keepLoggedIn: action.keepLoggedIn,
      };
    case "LOGOUT":
      return { ...state, user: null, token: null, keepLoggedIn: false };
    case "SET_USER_DATA":
      return {
        ...state,
        user: {
          username: action.username,
          firstName: action.firstName,
          lastName: action.lastName,
          age: action.age,
          gender: action.gender,
        },
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "session",
  storage,
};

export const persistedSessionReducer = persistReducer(
  persistConfig,
  sessionReducer
);
