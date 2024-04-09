import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


export default function Navbar() {
  let location = useLocation();
  let navigate = useNavigate()
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login")
  }
 
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navigation  bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          NoteBar
        </Link>
        <button
          className="navbar-toggler"
          type="button" 
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link className={`nav-link ${location.pathname==="/"?"active" :"" }`} aria-current="page" to="/">
              Home
            </Link>
            <Link className={`nav-link ${location.pathname==="/about"?"active" :"" }`} to="/about">
              About
            </Link>
            {/* <Link className="nav-link" to="#">
              Contact
            </Link> */}
          </div>
          { !localStorage.getItem('token') ? <div className="d-flex">
            <Link className="btn btn-primary mx-1 loginBtn" to="/login">Login</Link>
            <Link className="btn btn-primary mx-1 loginBtn" to="/register">Register</Link>
          </div>:<div><button onClick={handleLogout} className="btn btn-primary loginBtn">Logout</button></div>}
        </div>
      </div> 
    </nav>
  );
}
