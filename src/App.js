import * as React from "react";
import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage/LoginPage.tsx";
import RegisterPage from "./Components/RegisterPage/RegisterPage.tsx";
import Home from "./Components/Home/Home.tsx";
import Dashboard from "./Components/Dashboard/Dashboard.tsx";
import Appointment from "./Components/Dashboard/Appointment/Appointment.tsx";
import Cars from "./Components/Dashboard/Cars/Cars.tsx";
import Shop from "./Components/Dashboard/Shop/Shop.tsx";
import ProfileDetails from "./Components/Dashboard/Profile/ProfileDetails/ProfileDetails.tsx";
import ProfileSettings from "./Components/Dashboard/Profile/ProfileSettings/ProfileSettings.tsx";
import PageNotFound from "./Components/PageNotFound/PageNotFound.tsx";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard.tsx";
import Employees from "./Components/AdminDashboard/Employees/Employees.tsx";
import Warehouse from "./Components/AdminDashboard/Warehouse/Warehouse.tsx";
import AuthContext from "./Components/context/AuthProvider.tsx";
import {
  ClientProtectedRoute,
  AdminProtectedRoute,
  ProtectedRoute
} from "./Components/ProtectedRoute/ProtectedRoute.tsx";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    isAuthenticated();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <ProtectedRoute>
            <LoginPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute>
            <RegisterPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ClientProtectedRoute>
            <Dashboard />
          </ClientProtectedRoute>
        }
      />
      <Route
        path="/dashboard/cars"
        element={
          <ClientProtectedRoute>
            <Cars />
          </ClientProtectedRoute>
        }
      />
      <Route
        path="/dashboard/appointment"
        element={
          <ClientProtectedRoute>
            <Appointment />
          </ClientProtectedRoute>
        }
      />
      <Route
        path="/dashboard/shop"
        element={
          <ClientProtectedRoute>
            <Shop />
          </ClientProtectedRoute>
        }
      />
      <Route
        path="/dashboard/profile"
        element={
          <ClientProtectedRoute>
            <ProfileDetails />
          </ClientProtectedRoute>
        }
      />
      <Route
        path="/dashboard/profile/settings"
        element={
          <ClientProtectedRoute>
            <ProfileSettings />
          </ClientProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin/employees"
        element={
          <AdminProtectedRoute>
            <Employees />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin/warehouse"
        element={
          <AdminProtectedRoute>
            <Warehouse />
          </AdminProtectedRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
