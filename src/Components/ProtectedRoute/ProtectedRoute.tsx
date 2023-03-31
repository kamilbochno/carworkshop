import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider.tsx";

export const ClientProtectedRoute = ({ children }) => {
  const { auth, admin, isAuthenticated } = useContext<any>(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    isAuthenticated();
  }, []);
  if (auth && !admin) {
    return children;
  } else {
    navigate("/");
  }
};
export const AdminProtectedRoute = ({ children }) => {
  const { auth, admin, isAuthenticated } = useContext<any>(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    isAuthenticated();
  }, []);
  if (auth && admin) {
    return children;
  } else {
    navigate("/");
  }
};

export const ProtectedRoute = ({ children }) => {
  const { auth, isAuthenticated } = useContext<any>(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    isAuthenticated();
  }, []);
  if (!auth) {
    return children;
  } else {
    navigate("/");
  }
};
