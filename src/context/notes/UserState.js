import React, { useState } from "react";
import UserContext from "./userContext";

function UserState(props) {
  const host = "https://notebar-be.onrender.com";
  const userInitial = [];
  
 const [loading, setLoading] = useState(true);
  const getUser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    setLoading(true);
    const json = await response.json();
    // console.log(json);
    setUser(json);
    setLoading(false);
  };
  const [user, setUser] = useState(userInitial);
  return (
    <UserContext.Provider value={{ user, getUser,loading }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
