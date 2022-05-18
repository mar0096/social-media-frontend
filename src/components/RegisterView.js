import { FormRow, Alert } from "../components";
import { useAppContext } from "../context/appContext";

function RegisterView({ values, handleChange, onSubmit, toggleMember }) {
  const { isLoading, showAlert } = useAppContext();
  return (
    <div className="login">
      <div className="login-box">
        <form className="form" onSubmit={onSubmit}>
          <h2>{values.isMember ? "Login" : "Register"}</h2>
          {showAlert && <Alert />}
          <FormRow
            type="text"
            name="username"
            className="login-form"
            value={values.username}
            handleChange={handleChange}
          />

          {!values.isMember && (
            <FormRow
              type="email"
              name="email"
              value={values.email}
              className="login-form"
              handleChange={handleChange}
            />
          )}
          <FormRow
            type="password"
            name="password"
            className="login-form"
            value={values.password}
            handleChange={handleChange}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
          >
            {values.isMember ? "Login" : "Register"}
          </button>
          <p>
            {values.isMember ? "Not a member yet?" : "Already a member?"}
            <button type="button" onClick={toggleMember}>
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterView;
