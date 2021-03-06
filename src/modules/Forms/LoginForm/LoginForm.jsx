import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../Form.scss";
import { Logo } from "../../../components/Logo/Logo";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { useInputChange } from "../../../utils/customHooks/UseInputChange";
import { useBoolean } from "../../../utils/customHooks/UseBoolean";
import { validateCredentials } from "./../../../utils/validations/validateCredentials.js";
import { isObjectEmpty } from "./../../../utils/helpers.js";
import { Link, useHistory } from "react-router-dom";
import { loginRequest } from "../../../api/repository";
import { login } from "../../../actionCreators/sessionActionCreators";
import { Loader } from "../../../components/Loader/Loader";

export const LoginForm = () => {
  const [username, handleUsernameChange] = useInputChange("");
  const [password, handlePasswordChange] = useInputChange("");
  const [keepLoggedIn, handlekeepLoggedInChange] = useBoolean(false);
  const [errors, setErrors] = useState({});
  const [show, toggleShow] = useBoolean(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useBoolean(false);

  const onLogin = (e) => {
    e.preventDefault();
    const errs = validateCredentials(username, password)
    setErrors(errs);

    if (isObjectEmpty(errs)) {
      setIsLoading(true);
      loginRequest({
        username: username,
        password: password
      })
        .then((response) => {
          if (response.error) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              credentials: "Wrong credentials. Try again.",
            }));
          } else {
            dispatch(login(response.user, response.token,  keepLoggedIn));
            history.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="form-wrapper auth-form">
        <form onSubmit={onLogin}>
          <Logo />
          <h1 className="form-title">Log in</h1>
          <div className="form-field">
            <Input
              name="Username"
              icon="fa fa-user"
              type="text"
              onChange={handleUsernameChange}
              value={username}
              error={errors.username}
            />
          </div>
          
          <div className="form-field">
            <Input
            name="Password"
            icon="fa fa-lock"
            type={show ? "text" : "password"}
            onChange={handlePasswordChange}
            value={password}
            iconDecoration={
                <i className="fa fa-eye" aria-hidden="true" title="Show password" onClick={toggleShow}></i>
            }
            error={errors.password}
            />
          </div>

          <div className="keep-logged-in">
            <Input
              name="Keep me logged in"
              type="checkbox"
              value="remember"
              onChange={handlekeepLoggedInChange}
              checked={keepLoggedIn}
            />
          </div>
        
          <div className="error-wrapper">
            <div className="error">{errors && errors.credentials}</div>
          </div>
          <Button type="inverse">Log in</Button>
          <p className="auth-link">
            You don't have an account? Register <Link to="/register">here</Link>
            .
          </p>
        </form>
      </div>
    </>
  );
};