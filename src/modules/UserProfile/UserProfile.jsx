import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./UserProfile.scss";
import { useBoolean } from "../../utils/customHooks/UseBoolean";
import { Modal } from "../../components/Modal/Modal";
import { deleteUserRequest } from "../../api/repository";
import { logout } from "../../actionCreators/sessionActionCreators";
import { EditUserProfile } from "./EditUserProfile";
import { ChangeProfilePhoto } from "./ChangeProfilePhoto";
import {Logo} from "../../components/Logo/Logo"

export function UserProfile() {
  const user = useSelector((state) => state.session.user);
  const token = useSelector((state) => state.session.token);
  const [isDeleteAccountOpen, toggleDeleteAccountOpen] = useBoolean();
  const [isEditAccountOpen, toggleEditAccountOpen] = useBoolean();
  const [isChangePhotoOpen, toggleChangePhotoOpen] = useBoolean();
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

  return (
    <>
      <h1>User profile</h1>
      <div className="user-profile">
        <div className="user-data-wrapper">
          <div className="user-image-wrapper">
            {user.image ? <img
              src={user.image.base64}
              alt="user profile"
            /> :
            <Logo />
            }  
          </div>
          <div className="user-data">
            <div className="actions">
              <button onClick={toggleChangePhotoOpen}>
                <i className="fa fa-camera" aria-hidden="true"></i>
              </button>
              <button onClick={toggleEditAccountOpen}>
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </button>
              <button onClick={toggleDeleteAccountOpen}>
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
            <div className="data-group name">
              <h2>
                {user.firstName} {user.lastName}
              </h2>
            </div>
            <div className="data-group">
              <div className="data-label">Username</div>
              <div>{user.username}</div>
            </div>
            <div className="data-group">
              <div className="data-label">Age</div>
              <div>{user.age}</div>
            </div>
            <div className="data-group">
              <div className="data-label">Gender</div>
              <div>{user.gender}</div>
            </div>
          </div>
        </div>
        {isDeleteAccountOpen && (
          <Modal>
            <div className="modal-content delete-account">
              <div className="modal-header">
                <p>Are you sure you want to delete your account?</p>
                <button className="close" onClick={toggleDeleteAccountOpen}>
                  &#10005;
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
            <div className="modal-content">
              <div className="modal-header">
                <p>Edit your profile</p>
                <button className="close" onClick={toggleEditAccountOpen}>
                  &#10005;
                </button>
              </div>
              <div className="modal-content">
                <EditUserProfile
                  toggleModal={toggleEditAccountOpen}
                  user={user}
                />
              </div>
            </div>
          </Modal>
        )}

        {isChangePhotoOpen && (
          <Modal>
            <div className="modal-content change-photo">
              <div className="modal-header">
                <p>Change your profile photo</p>
                <button className="close" onClick={toggleChangePhotoOpen}>
                  &#10005;
                </button>
              </div>
              <div className="modal-content">
                <ChangeProfilePhoto
                  toggleModal={toggleChangePhotoOpen}
                  user={user}
                />
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}
