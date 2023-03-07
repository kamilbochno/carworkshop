import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [profileInfo, setProfileInfo] = useState<any>([]);
  const getUserProfile = () => {
    const token = { token: localStorage.getItem("token") };
    axios.post("/dashboard/profile", token).then((response) => {
      const data = response.data[0];
      setProfileInfo(data);
      console.log(response.data);
    });
  };
  return (
    <UserContext.Provider value={{ profileInfo, setProfileInfo, getUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
