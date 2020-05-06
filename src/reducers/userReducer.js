export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER_DATA":
      return { ...state, username: action.username, firstName: action.firstName, lastName: action.lastName, age: action.age, gender: action.gender };
    default:
      return state;
  }
};
