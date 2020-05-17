import React, { useState } from "react";
import "../Forms/Form.scss";
import "./EditUserProfile.scss";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { useBoolean } from "../../utils/customHooks/UseBoolean";
import { validateEditUserData } from "./../../utils/validations/validateEditUserData.js";
import { isObjectEmpty } from "./../../utils/helpers.js";
import { useCallback } from "react";
import { editUserRequest } from "../../api/repository";
import { setUserData } from "../../actionCreators/sessionActionCreators";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../../components/Loader/Loader";

export const EditUserProfile = ({ toggleModal, user }) => {
  const [errors, setErrors] = useState({});
  const [newUserData, setNewUserData] = useState({});
  const token = useSelector((state) => state.session.token);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useBoolean(false);

  const handleChange = useCallback(field => newValue =>
    setNewUserData((prev) =>
      user[field] !== newValue
        ? { ...prev, [field]: newValue }
        : Object.keys(newUserData).reduce((object, key) => {
            if (key !== field) {
              object[key] = newUserData[key];
            }
            return object;
          }, {})
    )
  );

  const saveChanges = (e) => {
    e.preventDefault();
    const errs = validateEditUserData({ ...user, ...newUserData });
    setErrors(errs);

    if (isObjectEmpty(errs)) {
      setIsLoading(true);
      editUserRequest(token, newUserData)
        .then((response) => {
          if (response.error) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              editError: response.error,
            }));
            setIsLoading(false);
          } else {
            dispatch(setUserData({ ...user, ...newUserData }));
            setIsLoading(false);
            toggleModal();
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="form-wrapper">
        <form onSubmit={saveChanges}>
          <Input
            name="Username"
            icon="fa fa-user-circle"
            type="text"
            value={user.username}
            onChange={handleChange("username")}
          />
          {errors.username && <div className="error">{errors.username}</div>}

          <div className="two-col">
            <div className="col">
              <Input
                name="First name"
                icon="fa fa-user"
                type="text"
                value={user.firstName}
                onChange={handleChange("firstName")}
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
                value={user.lastName}
                onChange={handleChange("lastName")}
              />
              {errors.lastName && (
                <div className="error">{errors.lastName}</div>
              )}
            </div>
          </div>

          <div className="label-inline ">
            <i className="fa fa-birthday-cake" aria-hidden="true"></i>
            <label>Age</label>
            <Input
              type="number"
              onChange={handleChange("age")}
              value={user.age}
            />

            {errors.age && <div className="error">{errors.age}</div>}
          </div>

          <div className="label-inline radios">
            <i className="fa fa-venus-mars" aria-hidden="true"></i>
            <label>Gender</label>
            <Input
              name="Male"
              type="radio"
              value="Male"
              onChange={handleChange("gender")}
              checked={
                newUserData.gender
                  ? newUserData.gender === "Male"
                  : user.gender === "Male"
              }
            />
            <Input
              name="Female"
              type="radio"
              value="Female"
              onChange={handleChange("gender")}
              checked={
                newUserData.gender
                  ? newUserData.gender === "Female"
                  : user.gender === "Female"
              }
            />
          </div>
          {errors.gender && <div className="error">{errors.gender}</div>}

          {errors.editError && (
            <div className="error-wrapper">
              <div className="error">{errors.editError}</div>
            </div>
          )}
          <Button type="default">Save changes</Button>
        </form>
      </div>
    </>
  );
};
