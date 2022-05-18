import React, { useState } from "react";
import { EditUserView } from "../../components";
import { useAppContext } from "../../context/appContext";

import { useNavigate } from "react-router-dom";

function EditProfile() {
  const {
    user,
    displayAlert,
    updateUser,
    uploadImage,
    imageSrc,
    defaultImage,
  } = useAppContext();

  let navigate = useNavigate();
  const [values, setValues] = useState({
    username: user?.username,
    name: user?.name,
    email: user?.email,
    bio: user?.bio,
    category: user?.category,
    profileImage: user?.profileImage,
    private: user.private,
  });

  const changeImage = async (e) => {
    uploadImage(e.target.files[0]);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSwitch = (e) => {
    setValues({ ...values, private: !values.private });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.username || !values.email) {
      displayAlert();
      return;
    }
    updateUser(values, imageSrc);
    setTimeout(() => {
      navigate("/profile");
    }, 300);
  };
  return (
    <EditUserView
      changeImage={changeImage}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleSwitch={handleSwitch}
      defaultImage={defaultImage}
      values={values}
      imageSrc={imageSrc}
    />
  );
}

export default EditProfile;
