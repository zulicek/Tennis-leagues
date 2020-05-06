import React from "react";
import { useSelector } from "react-redux";
import "./UserProfile.scss";

export function UserProfile() {
  const { username, firstName, lastName, age, gender } = useSelector(
    (state) => state.userData
  );

  return (
    <>
      <h1>User profile</h1>
      <div className="user-profile">
        <div className="user-data-wrapper">
          <div className="user-image-wrapper">
            <img src="https://images.pexels.com/photos/1407818/pexels-photo-1407818.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
          </div>
          <div className="user-data">
            <div className="actions">
              <button>
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </button>
              <button>
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
            <div className="data-group name">
              <h2>
                {firstName} {lastName}
              </h2>
            </div>
            <div className="data-group">
              <div className="data-label">Username</div>
              <div>{username}</div>
            </div>
            <div className="data-group">
              <div className="data-label">Age</div>
              <div>{age}</div>
            </div>
            <div className="data-group">
              <div className="data-label">Gender</div>
              <div>{gender}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
