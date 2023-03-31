import React from "react";
import { createContext, useState, useContext } from "react";
import axios from "axios";
import LoadingContext from "../LoadingProvider.tsx";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const { setIsLoading } = useContext<any>(LoadingContext);
  const [profileInfo, setProfileInfo] = useState<any>([]);
  const getUserProfile = () => {
    setIsLoading(true);
    axios.get("/dashboard/profile").then((response) => {
      const data = response.data[0];
      setProfileInfo(data);
      setIsLoading(false);
    });
  };
  return (
    <UserContext.Provider value={{ profileInfo, setProfileInfo, getUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
