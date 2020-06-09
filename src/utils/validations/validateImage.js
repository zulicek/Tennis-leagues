export const validateImage = (file) => {
    let errors = {};

    if (!file.name.match(/.(jpg|jpeg|png|gif)$/i)) errors.image = "The profile picture must be an image."
   
    return errors;
}