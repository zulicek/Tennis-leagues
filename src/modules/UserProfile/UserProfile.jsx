import React from "react";
import { useSelector } from "react-redux";
import "./UserProfile.scss";

export function UserProfile() {
  const { username, firstName, lastName, gender } = useSelector(
    (state) => state.userData
  );

  return (
    <>
      <h1>User profile</h1>
      <div className="user-profile">
        <div className="user-image-wrapper">
          <img src="https://images.pexels.com/photos/1407818/pexels-photo-1407818.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
        </div>
        <div className="user-data-wrapper">
          <div className="data-group">
            <div>Username</div>
            <div>{username}</div>
          </div>
          <div className="data-group">
            <div>First name</div>
            <div>{firstName}</div>
          </div>
          <div className="data-group">
            <div>Last name</div>
            <div>{lastName}</div>
          </div>
          <div className="data-group">
            <div>Gender</div>
            <div>{gender}</div>
          </div>
        </div>
      </div>
    </>
  );
}
