import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from './Spinner';

const host = "https://notebar-be.onrender.com";


function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      setLoading(false);
      navigate("/");
    } else {
      props.showAlert("Invalid Credintials", "danger");
      setLoading(false);
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  console.log(loading)
  return (
    <>
   
  
    <div className="loginBody">
      <div className="container login">
      <h1>Login to NoteBar</h1>
      {loading && <Spinner />}
      {!loading && <form onSubmit={handleSubmit}>
          
          
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
              required
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
              required
            />
          </div>
          <button type="submit" className="btn btn-primary loginBtn">
            Submit
          </button>
        </form>}
      </div>
    </div>
    </>
  );
}

export default Login;
