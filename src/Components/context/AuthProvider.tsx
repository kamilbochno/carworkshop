import React from "react";
import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [admin, setAdmin] = useState(false);

  const isAuthenticated = () => {
    axios.post("/refresh").then((response) => {
      if (response.status === 200) {
        if (response.data.admin === true) {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
        setAuth(true);
      } else {
        setAuth(false);
      }
    });
  };

  const logout = () => {
    axios
      .get("/logout")
      .then((res) => {
        setAuth(false);
        toast.success(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, isAuthenticated, logout, admin, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
