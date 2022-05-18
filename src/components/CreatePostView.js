import React from "react";
import { Alert, Switch } from "./";
function CreatePostView({
  handleInput,
  handleCreate,
  changeHandler,
  imageSrc,
  isImageLoading,
  isLoading,
  showAlert,
  postId,
  handleDelete,
  handleUpdate,
  handleSwitch,
  values,
}) {
  return (
    <div className="create">
      <form>
        <h2>{postId ? "Edit Post" : "New Post"}</h2>
        {showAlert && <Alert />}
        <div className="photo">
          <img src={imageSrc || "../defaultPost.png"} alt="" />
        </div>
        {postId ? null : (
          <label className={imageSrc ? "btn btn-secondary" : "btn btn-primary"}>
            <input type="file" onChange={changeHandler} />
            {imageSrc ? "Change Image" : "Upload Image"}
          </label>
        )}

        <div>
          <textarea
            className="create-caption"
            name="caption"
            rows="10"
            cols="50"
            onChange={handleInput}
            value={values.caption}
            placeholder="Write a caption..."
          ></textarea>

          <Switch
            value={values.hideComment}
            handleSwitch={handleSwitch}
            name="hideComment"
            key="hideComment"
          />
          {/* <Switch
            value={values.archive}
            handleSwitch={handleSwitch}
            name="archive"
            key="archive"
          /> */}
          <button
            className={`btn ${
              isImageLoading || !imageSrc ? "btn-secondary" : "btn-primary"
            }`}
            onClick={postId ? handleUpdate : handleCreate}
            disabled={isImageLoading || !imageSrc}
          >
            {postId ? "Update" : "Share"}
          </button>
          {postId ? (
            <button className={`btn btn-gray`} onClick={handleDelete}>
              delete
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default CreatePostView;
