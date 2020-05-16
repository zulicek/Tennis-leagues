import { validateCredentials } from './validateCredentials.js'

export const validateRegister = ({
  username,
  password,
  firstName,
  lastName,
  age,
  gender
}) => {

  const errors = { ...validateCredentials(username, password) }

  if (!firstName) {
    errors.firstName = "First name can't be empty";
  }

  if (!lastName) {
    errors.lastName = "Last name can't be empty";
  }

  if (!age || age < 13) {
    errors.age = "Age has to be greater than 13";
    console.log()
  }

  if (!gender) {
    errors.gender = "Gender can't be empty";
  }

  return errors;
};
