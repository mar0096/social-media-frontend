import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { CreatePostView, UserBar } from "../../components";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function CreatePost() {
  const {
    uploadImage,
    showAlert,
    imageSrc,
    isLoading,
    createPost,
    singlePost,
    user,
    isImageLoading,
    clearValues,
    deletePost,
    updatePost,
  } = useAppContext();
  let navigate = useNavigate();
  const { id } = useParams();
  const [values, setValues] = useState({
    caption: id ? singlePost.caption : "",
    hideComment: id ? !singlePost.showComment : false,
    archive: id ? singlePost.archive : false,
  });

  const changeHandler = async (e) => {
    uploadImage(e.target.files[0]);
    // handleChange({ imageSrc });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    createPost({ values });
    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    updatePost({ action: "update", postId: id, values });
    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deletePost(id);
    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  };

  // const handleInput = (e) => {
  //   e.preventDefault();
  //   handleChange({ [e.target.name]: e.target.value });
  // };

  // const handleSwitchComment = (e) => {
  //   e.preventDefault();

  //   handleChange({ hideComment: !hideComment });
  // };

  // const handleSwitcharchive = (e) => {
  //   e.preventDefault();

  //   handleChange({ archive: !archive });
  // };
  const handleInput = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSwitch = (e) => {
    setValues({ ...values, hideComment: !values.hideComment });
  };

  useEffect(() => {
    if (!id) {
      clearValues();
    }
  }, [id]);

  if (id && (singlePost._id !== id || singlePost.createdBy !== user._id))
    return <h3>something wrong</h3>;
  return (
    <CreatePostView
      handleInput={handleInput}
      handleCreate={handleCreate}
      changeHandler={changeHandler}
      // handleSwitchComment={handleSwitchComment}
      // handleSwitcharchive={handleSwitcharchive}
      handleSwitch={handleSwitch}
      imageSrc={imageSrc}
      isLoading={isLoading}
      showAlert={showAlert}
      postId={id}
      isImageLoading={isImageLoading}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
      values={values}
    />
  );
}

export default CreatePost;
