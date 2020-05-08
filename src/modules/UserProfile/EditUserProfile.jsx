import React, { useState , useEffect} from "react";
import "../Forms/Form.scss";
import "../Forms/RegisterForm/RegisterForm.scss";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { useInputChange } from "../../utils/customHooks/UseInputChange";
import { useBoolean } from "../../utils/customHooks/UseBoolean";
import { validateRegister } from "./../../utils/validations/validateRegister.js";
import { isObjectEmpty } from "./../../utils/helpers.js";

export const EditUserProfile = ({saveChanges}) => {
  const [username, handleUsernameChange] = useInputChange("");
  const [password, handlePasswordChange] = useInputChange("");
  const [firstName, handleFirstNameChange] = useInputChange("");
  const [lastName, handleLastNameChange] = useInputChange("");
  const [age, handleAgeChange] = useInputChange("");
  const [gender, handleGenderChange] = useInputChange("");
  const [errors, setErrors] = useState({});
  const [show, toggleShow] = useBoolean(false);

  return (
    <div className="form-wrapper">
    <form onSubmit={saveChanges}>
      <h1 className="form-title">Edit your profile</h1>
      <Input
        name="Username"
        icon="fa fa-user-circle"
        type="text"
        onChange={handleUsernameChange}
      />
      {errors.username && <div className="error">{errors.username}</div>}

      <Input
        name="Password"
        icon="fa fa-lock"
        type={show ? "text" : "password"}
        onChange={handlePasswordChange}
        iconDecoration={
          <div className="show-password" onClick={toggleShow}>
            <i className="fa fa-eye" aria-hidden="true"></i>
            <span className="tooltip">Show password</span>
          </div>
        }
      />
      {errors.password && <div className="error">{errors.password}</div>}

      <div className="two-col">
        <div className="col">
          <Input
            name="First name"
            icon="fa fa-user"
            type="text"
            onChange={handleFirstNameChange}
          />
          {errors.firstName && <div className="error">{errors.firstName}</div>}
        </div>

        <div className="col">
          <Input
            name="Last name"
            icon="fa fa-user"
            type="text"
            onChange={handleLastNameChange}
          />
          {errors.lastName && <div className="error">{errors.lastName}</div>}
        </div>
      </div>

      <div className="label-inline ">
        <i className="fa fa-birthday-cake" aria-hidden="true"></i>
        <label>Age</label>
        <Input type="number" onChange={handleAgeChange} />

        {errors.age && <div className="error">{errors.age}</div>}
      </div>

      <div className="label-inline radios">
        <i className="fa fa-venus-mars" aria-hidden="true"></i>
        <label>Gender</label>
        <Input
          name="Male"
          type="radio"
          value="Male"
          onChange={handleGenderChange}
          checked={gender === "Male"}
        />
        <Input
          name="Female"
          type="radio"
          value="Female"
          onChange={handleGenderChange}
          checked={gender === "Female"}
        />
      </div>
      {errors.gender && <div className="error">{errors.gender}</div>}

      {errors.credentials && (
        <div className="error-wrapper">
          <div className="error">{errors.credentials}</div>
        </div>
      )}
      <Button type="inverse">Save changes</Button>
    </form>
    </div>
  );
};
