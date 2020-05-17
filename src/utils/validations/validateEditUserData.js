export const validateEditUserData = ({
  username,
  firstName,
  lastName,
  age,
  gender,
}) => {

  let errors = {};
  
  if (!username) {
    errors.username = "Username can't be empty";
  }

  if (!firstName) {
    errors.firstName = "First name can't be empty";
  }

  if (!lastName) {
    errors.lastName = "Last name can't be empty";
  }

  if (!age || age < 13) {
    errors.age = "Age has to be greater than 13";
  }

  if (!gender) {
    errors.gender = "Gender can't be empty";
  }

  return errors;
};
