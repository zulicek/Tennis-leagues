export const setCurrentUserData = ({username, firstName, lastName, gender}) => {
    return ({
      type: 'SET_CURRENT_USER_DATA',
      username: username,
      firstName: firstName,
      lastName: lastName,
      gender: gender
  })};
  
  