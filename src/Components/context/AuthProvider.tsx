import React from "react";
import { createContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router";
import axios from "axios";

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
        <Navigate to="/" />;
      }
      if (response.status === 401) {
        setAuth(false);
        <Navigate to="/" />;
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
