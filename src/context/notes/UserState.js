import React, { useState } from "react";
import UserContext from "./userContext";

function UserState(props) {
  const host = "https://notebar-be.onrender.com/";
  const userInitial = [];
  
  const getUser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
   
    const json = await response.json();
    // console.log(json);
    setUser(json);
  };
  const [user, setUser] = useState(userInitial);
  return (
    <UserContext.Provider value={{ user, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
