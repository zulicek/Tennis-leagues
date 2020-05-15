import React, { useState, useEffect } from "react";
import "../Forms/Form.scss";
import "./EditUserProfile.scss";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { useInputChange } from "../../utils/customHooks/UseInputChange";
import { useBoolean } from "../../utils/customHooks/UseBoolean";
import { validateRegister } from "./../../utils/validations/validateRegister.js";
import { isObjectEmpty } from "./../../utils/helpers.js";

export const EditUserProfile = ({ saveChanges, username, firstName, lastName, age, gender }) => {
  const [newUsername, handleUsernameChange] = useInputChange(username);
  const [password, handlePasswordChange] = useInputChange("");
  const [newFirstName, handleFirstNameChange] = useInputChange(firstName);
  const [newLastName, handleLastNameChange] = useInputChange(lastName);
  const [newAge, handleAgeChange] = useInputChange(age);
  const [newGender, handleGenderChange] = useInputChange(gender);
  const [errors, setErrors] = useState({});

  return (
    <div className="form-wrapper">
      <form onSubmit={() => saveChanges(newUsername || username, newFirstName || firstName, newLastName || lastName,
        newAge || age, newGender || gender)}>
        <Input
          name="Username"
          icon="fa fa-user-circle"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
        {errors.username && <div className="error">{errors.username}</div>}

        <div className="two-col">
          <div className="col">
            <Input
              name="First name"
              icon="fa fa-user"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
            />
            {errors.firstName && (
              <div className="error">{errors.firstName}</div>
            )}
          </div>

          <div className="col">
            <Input
              name="Last name"
              icon="fa fa-user"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
            />
            {errors.lastName && <div className="error">{errors.lastName}</div>}
          </div>
        </div>

        <div className="label-inline ">
          <i className="fa fa-birthday-cake" aria-hidden="true"></i>
          <label>Age</label>
          <Input type="number" onChange={handleAgeChange} value={age} />

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
        <Button type="default">Save changes</Button>
      </form>
    </div>
  );
};
