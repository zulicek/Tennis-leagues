export const login = (user, token, keepLoggedIn) => {
  return ({
    type: 'LOGIN',
    user: user,
    token: token,
    keepLoggedIn: keepLoggedIn
})};

export const logout = () => ({
  type: 'LOGOUT'
});

export const setUserData = (username, firstName, lastName, age, gender) => {
  return ({
    type: 'SET_USER_DATA',
    username: username,
    firstName: firstName,
    lastName: lastName,
    age: age,
    gender: gender
})};

