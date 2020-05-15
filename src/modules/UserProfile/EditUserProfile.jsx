import React, { useState, useEffect } from "react";
import "../Forms/Form.scss";
import "./EditUserProfile.scss";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { useInputChange } from "../../utils/customHooks/UseInputChange";
import { useBoolean } from "../../utils/customHooks/UseBoolean";
import { validateRegister } from "./../../utils/validations/validateRegister.js";
import { isObjectEmpty } from "./../../utils/helpers.js";
import { useCallback } from "react";

export const EditUserProfile = ({
  saveChanges,
  username,
  firstName,
  lastName,
  age,
  gender,
}) => {
  const [errors, setErrors] = useState({});

  const [user, setUser] = useState({})

  const handleChange = useCallback(field => (newValue)=> 
    setUser(prev => ({...prev, [field]: newValue}))
  )

  return (
    <div className="form-wrapper">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveChanges(user);
        }}
      >
        <Input
          name="Username"
          icon="fa fa-user-circle"
          type="text"
          value={username}
          onChange={handleChange('username')}
        />
        {errors.username && <div className="error">{errors.username}</div>}

        <div className="two-col">
          <div className="col">
            <Input
              name="First name"
              icon="fa fa-user"
              type="text"
              value={firstName}
              onChange={handleChange('firstName')}
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
              onChange={handleChange('lastName')}
            />
            {errors.lastName && <div className="error">{errors.lastName}</div>}
          </div>
        </div>

        <div className="label-inline ">
          <i className="fa fa-birthday-cake" aria-hidden="true"></i>
          <label>Age</label>
          <Input type="number" onChange={handleChange('age')} value={age} />

          {errors.age && <div className="error">{errors.age}</div>}
        </div>

        <div className="label-inline radios">
          <i className="fa fa-venus-mars" aria-hidden="true"></i>
          <label>Gender</label>
          <Input
            name="Male"
            type="radio"
            value="Male"
            onChange={handleChange('gender')}
            checked={gender === "Male"}
          />
          <Input
            name="Female"
            type="radio"
            value="Female"
            onChange={handleChange('gender')}
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
