import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./UserProfile.scss";
import { useBoolean } from "../../utils/customHooks/UseBoolean";
import { Modal } from "../../components/Modal/Modal";
import { deleteUserRequest } from "../../api/repository";
import { logout } from "../../actionCreators/sessionActionCreators";
import { EditUserProfile } from "./EditUserProfile";

export function UserProfile() {
  const { username, firstName, lastName, age, gender } = useSelector(
    (state) => state.userData
  );
  const token = useSelector((state) => state.session.token);
  const [isDeleteAccountOpen, toggleDeleteAccountOpen] = useBoolean();
  const [isEditAccountOpen, toggleEditAccountOpen] = useBoolean();
  const dispatch = useDispatch();

  const deleteAccount = () => {
    deleteUserRequest(token)
      .then((response) => {
        if (response.error) {
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveChanges = () => {
    alert("save!")
  }

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
              <button onClick={toggleEditAccountOpen}>
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </button>
              <button onClick={toggleDeleteAccountOpen}>
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
        {isDeleteAccountOpen && (
          <Modal>
            <div className="modal-content delete-account">
              <div className="modal-header">
                <p>Are you sure you want to delete yout account?</p>
                <button className="close" onClick={toggleDeleteAccountOpen}>
                  X
                </button>
              </div>
              <div className="modal-actions">
                <button className="btn btn-default" onClick={deleteAccount}>
                  Yes
                </button>
                <button
                  className="btn btn-inverse"
                  onClick={toggleDeleteAccountOpen}
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        )}

        {isEditAccountOpen && (
          <Modal>
            <div className="modal-content edit-account">
              <div className="modal-header">
                <button className="close" onClick={toggleEditAccountOpen}>
                  X
                </button>
              </div>
              <div className="modal-content">
                <EditUserProfile saveChanges={saveChanges}/>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}
