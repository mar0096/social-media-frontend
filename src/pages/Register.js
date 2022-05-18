import { useState, useEffect } from "react";
import { RegisterView } from "../components";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  email: "",
  password: "",
  isMember: true,
};

function Register() {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();
  const { user, displayAlert, loginUser, registerUser } = useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, isMember } = values;
    if (!username || !password || (!isMember && !email)) {
      displayAlert("Please provide all values");
      return;
    }

    const currentUser = { username, email, password };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }

    // console.log(values);
  };
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <RegisterView
      handleChange={handleChange}
      onSubmit={onSubmit}
      toggleMember={toggleMember}
      values={values}
    />
  );
}

export default Register;
