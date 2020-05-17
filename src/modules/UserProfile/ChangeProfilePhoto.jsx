import React, { useState } from "react";
import "../Forms/Form.scss";
import "./ChangeProfilePhoto.scss";
import { Button } from "../../components/Button/Button";
import { useBoolean } from "../../utils/customHooks/UseBoolean";
import { editUserRequest } from "../../api/repository";
import { setUserData } from "../../actionCreators/sessionActionCreators";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../../components/Loader/Loader";
import { validateImage } from "./../../utils/validations/validateImage.js";
import { isObjectEmpty } from "./../../utils/helpers.js";
import FileBase64 from "react-file-base64";

export const ChangeProfilePhoto = ({ toggleModal, user }) => {
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState({});
  const token = useSelector((state) => state.session.token);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useBoolean(false);

  const imageUpload = (file) => {
    setImage(file);
  };

  const deletePhoto = () => {
    setImage(null);
  };

  const saveChanges = (e) => {
    e.preventDefault();

    if (image) {
      const errs = validateImage(image);
      setErrors(errs);

      if (isObjectEmpty(errs)) {
        setIsLoading(true);
        editUserRequest(token, { image: image.base64 })
          .then((response) => {
            if (response.error) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                photoError: response.error,
              }));
              setIsLoading(false);
            } else {
              dispatch(setUserData({ ...user, image: image.base64 }));
              setIsLoading(false);
              toggleModal();
            }
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
      }
    } else {
      setIsLoading(true);
      editUserRequest(token, { image: null })
        .then((response) => {
          if (response.error) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              photoError: response.error,
            }));
            setIsLoading(false);
          } else {
            dispatch(setUserData({ ...user, image: null }));
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
          {user.image && (
            <div className="user-image-wrapper">
              <img src={user.image} />
              <button onClick={deletePhoto}>
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          )}
          <div className="input-wrapper">
            <FileBase64 multiple={false} onDone={imageUpload} />
          </div>
          {(errors.image || errors.photoError) && (
            <div className="error-wrapper">
              <div className="error">{errors.image || errors.photoError}</div>
            </div>
          )}
          <Button type="default">Save photo</Button>
        </form>
      </div>
    </>
  );
};
