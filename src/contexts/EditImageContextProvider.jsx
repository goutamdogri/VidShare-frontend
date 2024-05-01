import { useState } from "react";
import EditImageContext from "./EditImageContext";
import propTypes from "prop-types";

const EditImageContextProvider = ({ children }) => {
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  return (
    <EditImageContext.Provider
      value={{ avatar, setAvatar, coverImage, setCoverImage }}
    >
      {children}
    </EditImageContext.Provider>
  );
};

EditImageContextProvider.propTypes = {
  children: propTypes.node,
};

export default EditImageContextProvider;
