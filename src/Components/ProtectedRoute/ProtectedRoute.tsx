import React from "react";
import { useContext } from "react";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthProvider.tsx";

export const ClientProtectedRoute = ({ children }) => {
  const { auth, isAdmin } = useContext<any>(AuthContext);
  const navigate = useNavigate();
  return auth && !isAdmin ? children : navigate("/");
};

export const AdminProtectedRoute = ({ children }) => {
  const { auth, isAdmin } = useContext<any>(AuthContext);
  const navigate = useNavigate();
  return auth && isAdmin ? children : navigate("/");
};

export const ProtectedRoute = ({ children }) => {
  const { auth } = useContext<any>(AuthContext);
  const navigate = useNavigate();
  return !auth ? children : navigate("/");
};
