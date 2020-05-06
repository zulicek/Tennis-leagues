export const setCurrentUserData = ({username, firstName, lastName, age, gender}) => {
    return ({
      type: 'SET_CURRENT_USER_DATA',
      username: username,
      firstName: firstName,
      lastName: lastName,
      age: age,
      gender: gender
  })};
  
  