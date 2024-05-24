import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const host = "https://notebar-be.onrender.com";

function Register(props) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const { name, email, password, confirmPassword } = credentials;

    if (password !== confirmPassword) {
      props.showAlert("Check password again!!!", "danger");
      setLoading(false)
    } else {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        //Save the auth token and redirect
        props.showAlert("Welcome!!!", "success");
        localStorage.setItem("token", json.authToken);
        setLoading(false);
        navigate("/");
      } else {
        props.showAlert("Email already Exist!!!", "danger");
        setLoading(false)
      }
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="regBody">
      <div className="container register">
      <h1>Register on NoteBar!</h1>
      {loading && <Spinner/>}
      {!loading && <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <strong>Name</strong>{" "}
            </label>
            <input
              type="name"
              className="form-control"
              id="name"
              name="name"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={credentials.name}
              minLength={5}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <strong>Email address</strong>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={onChange}
              value={credentials.email}
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={onChange}
              name="password"
              value={credentials.password}
              minLength={6}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              <strong>Confirm Password</strong>
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              onChange={onChange}
              name="confirmPassword"
              value={credentials.confirmPassword}
              minLength={6}
              required
            />
          </div>
          <button type="submit" className="btn  registerBtn">
            Register
          </button>
        </form>
      </div>}
    </div>
    </div>
    
  );
}

export default Register;
