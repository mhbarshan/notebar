import "./App.css";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js"
import About from "./components/About.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from "./context/notes/NoteState.js";
import UserState from "./context/notes/UserState.js";
import Alert from "./components/Alert.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import { useState } from "react";
import Footer from "./components/Footer.js";


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (massage,type)=>{
    setAlert({
      msg: massage,
      type: type
    })
    setTimeout(()=>{
      setAlert(null)
    },3000)
  }

  return (
    <>
      <NoteState>
        <UserState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert}/>} />
              <Route path="/register" element={<Register showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
        </UserState>
      </NoteState>
      <Footer/>
    </>
  );
}

export default App;
