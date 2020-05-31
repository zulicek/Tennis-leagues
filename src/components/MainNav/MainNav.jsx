import React, { useCallback } from "react";
import "./MainNav.scss";
import { NavLink } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { useBoolean } from "../../utils/customHooks/UseBoolean";
import { useDispatch } from "react-redux";
import { logout } from "../../actionCreators/sessionActionCreators";
import { useSelector } from "react-redux";

export function MainNav() {
  const { username, firstName, lastName, image } = useSelector(
    (state) => state.session.user
  );
  const [isOpen, toggleOpen] = useBoolean();
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <>
      <header className={`${isOpen ? "opened" : ""}`}>
      <div className="image-wrapper">
        <NavLink to="/profile">
            {image ? <img src={image.base64} alt="user profile" /> : <Logo />}
        </NavLink>
        </div>
        <div className="name username">{username}</div>
        <div className="name">
          {firstName} {lastName}
        </div>
        <ul>
          <li>
            <NavLink exact to="/">
              <div>Leagues</div>
              <i className="fa fa-trophy" aria-hidden="true"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/events">
              <div>Events</div>
              <i className="fa fa-calendar" aria-hidden="true"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile">
              <div>Profile</div>
              <i className="fa fa-user" aria-hidden="true"></i>
            </NavLink>
          </li>
          <li className="logout" onClick={onLogout}>
            <div>Log out</div>
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </li>
        </ul>
        <div id="mainnav-toggle" onClick={toggleOpen}>
          <span className="hamburger"></span>
        </div>
      </header>
    </>
  );
}
