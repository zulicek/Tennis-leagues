import React, { useState, useCallback } from "react";
import "./../Form.scss";
import { Logo } from "../../../components/Logo/Logo";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { useBoolean } from "../../../utils/customHooks/UseBoolean";
import { validateRegister } from "./../../../utils/validations/validateRegister.js";
import { isObjectEmpty } from "./../../../utils/helpers.js";
import { registerRequest, loginRequest } from "../../../api/repository";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../../actionCreators/sessionActionCreators";
import { useDispatch } from "react-redux";
import { Loader } from "../../../components/Loader/Loader";

export function RegisterForm() {
  const [errors, setErrors] = useState({});
  const [show, toggleShow] = useBoolean(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useBoolean(false);
  const [user, setUser] = useState({})

  const handleChange = useCallback(field => (newValue)=> 
    setUser(prev => ({...prev, [field]: newValue}))
  )

  const onRegister = (e) => {
    e.preventDefault();
    const errs = validateRegister(user)
    setErrors(errs);

    if (isObjectEmpty(errs)) {
      setIsLoading(true);
      registerRequest(user)
        .then((response) => {
          if (response.error) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              registerError: response.error,
            }));
            setIsLoading(false);
          } else {
            loginRequest({
              username: user.username,
              password: user.password,
            })
              .then((response) => {
                if (response.error) {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    credentials: "Wrong credentials. Try again.",
                  }));
                } else {
                  console.log(response);
                  dispatch(login(response.user, response.token, false));
                  setIsLoading(false);
                  history.push("/");
                }
              })
              .catch((error) => {
                console.log(error);
                setIsLoading(false);
              });
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
      <div className="form-wrapper auth-form">
        <form onSubmit={onRegister}>
          <Logo />
          <h1 className="form-title">Register</h1>

          <Input
            name="Username"
            icon="fa fa-user-circle"
            type="text"
            onChange={handleChange('username')}
            error={errors.username}
          />

          <Input
            name="Password"
            icon="fa fa-lock"
            type={show ? "text" : "password"}
            onChange={handleChange('password')}
            iconDecoration={
              <div className="show-password" onClick={toggleShow}>
                <i className="fa fa-eye" aria-hidden="true" title="show-password"></i>
              </div>
            }
            error={errors.password}
          />

          <div className="form-group">
            <Input
              name="First name"
              icon="fa fa-user"
              type="text"
              onChange={handleChange('firstName')}
              error={errors.firstName}
            />

            <Input
              name="Last name"
              icon="fa fa-user"
              type="text"
              onChange={handleChange('lastName')}
              error={errors.lastName}
            />
          </div>
            
          <Input name="Age"
            icon="fa fa-birthday-cake"  
            type="number" 
            onChange={handleChange('age')}
            error={errors.age}
            />

          <div className="form-group">
            <Input 
              icon="fa fa-venus-mars"
              name="Gender"
            />
            
            <Input
              name="Male"
              type="radio"
              value="Male"
              onChange={handleChange('gender')}
              checked={user.gender === "Male"}
            />
            <Input
              name="Female"
              type="radio"
              value="Female"
              onChange={handleChange('gender')}
              checked={user.gender === "Female"}
            />

            {errors.gender && <div className="error">{errors.gender}</div>}
          </div>  

          {errors.registerError && (
            <div className="error-wrapper">
              <div className="error">{errors.registerError}</div>
            </div>
          )}

          <Button type="inverse">Register</Button>
          <p className="auth-link">
            You already have an account? Log in <Link to="/login">here</Link>.
          </p>
        </form>
      </div>
    </>
  );
}
