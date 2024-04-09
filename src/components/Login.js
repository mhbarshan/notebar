import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const host = "https://notebar-be.onrender.com";

function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    console.log(json.authToken);
    if (json.success) {
      //Save the auth token and redirect
      props.showAlert("Welcome!!!", "success");
      localStorage.setItem("token", json.authToken);
      navigate("/");
    } else {
      props.showAlert("Invalid Credintials", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="loginBody">
      <div className="container login">
        <form onSubmit={handleSubmit}>
          <h1>Login to NoteBar</h1>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <strong>Email</strong>{" "}
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-labelledby="emailHelp"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={onChange}
              value={credentials.password}
            />
          </div>
          <button type="submit" className="btn btn-primary loginBtn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
