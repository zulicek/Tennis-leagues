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

export const setUserData = (user) => {
  return ({
    type: 'SET_USER_DATA',
    user: user
})};

