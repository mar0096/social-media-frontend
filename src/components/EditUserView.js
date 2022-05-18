import { Alert, FormRow, Switch } from "./";
import { useAppContext } from "../context/appContext";
function EditUserView({
  changeImage,
  handleChange,
  handleSubmit,
  values,
  imageSrc,
  handleSwitch,
  defaultImage,
}) {
  const {
    showAlert,

    isLoading,
  } = useAppContext();
  return (
    <div className="edit">
      <form onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>
        {showAlert && <Alert />}
        <div className="profile-photo-box">
          <div className="profile-photo">
            <img src={imageSrc || values.profileImage || defaultImage} alt="" />
          </div>
          <label className="btn btn-gray">
            <input type="file" onChange={changeImage} />
            {"Change Profile Photo"}
          </label>
        </div>

        <div>
          <FormRow
            className="create-form"
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
          <FormRow
            className="create-form"
            type="text"
            name="username"
            value={values.username}
            handleChange={handleChange}
          />
          <FormRow
            className="create-form"
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          <div className="create-form">
            <label htmlFor="bio">bio</label>
            <textarea
              name="bio"
              rows="10"
              cols="50"
              onChange={handleChange}
              value={values.bio}
            ></textarea>
          </div>

          <FormRow
            className="create-form"
            type="text"
            name="category"
            value={values.category}
            handleChange={handleChange}
          />
          <Switch
            value={values.private}
            handleSwitch={handleSwitch}
            name={"Private"}
          />
          <div className="create-btn-box">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
            >
              {isLoading ? "Please wait...." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditUserView;
