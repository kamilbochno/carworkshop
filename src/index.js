import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import PageNotFound from "./Components/PageNotFound/PageNotFound.tsx";
import LoginPage from "./Components/LoginPage/LoginPage.tsx";
import RegisterPage from "./Components/RegisterPage/RegisterPage.tsx";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./Components/context/AuthProvider.tsx";
import { UserProvider } from "./Components/context/userContext/UserProvider.tsx";
import { NewOffersProvider } from "./Components/context/userContext/NewOffersProvider.tsx";
import { UserCarsProvider } from "./Components/context/userContext/UserCarsProvider.tsx";
import { AppointmentProvider } from "./Components/context/userContext/AppointmentProvider.tsx";
import { ShopProvider } from "./Components/context/userContext/ShopProvider.tsx";
import { EmployeesProvider } from "./Components/context/adminContext/EmployeesProvider.tsx";
import { AdminAppointmentProvider } from "./Components/context/adminContext/AppointmentProvider.tsx";
import { AdminServicesHistoryProvider } from "./Components/context/adminContext/ServicesHistoryProvider.tsx";
import { WarehouseProvider } from "./Components/context/adminContext/WarehouseProvider.tsx";
import { ServicesHistoryProvider } from "./Components/context/userContext/ServicesHistoryProvider.tsx";
import { LoadingProvider } from "./Components/context/LoadingProvider.tsx";
import { OrderHistoryProvider } from "./Components/context/userContext/OrderHistoryProvider.tsx";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Routes,
  BrowserRouter
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <LoadingProvider>
      <AuthProvider>
        <UserProvider>
          <NewOffersProvider>
            <UserCarsProvider>
              <AppointmentProvider>
                <ShopProvider>
                  <EmployeesProvider>
                    <AdminAppointmentProvider>
                      <AdminServicesHistoryProvider>
                        <WarehouseProvider>
                          <ServicesHistoryProvider>
                            <OrderHistoryProvider>
                              <App />
                            </OrderHistoryProvider>
                          </ServicesHistoryProvider>
                        </WarehouseProvider>
                      </AdminServicesHistoryProvider>
                    </AdminAppointmentProvider>
                  </EmployeesProvider>
                </ShopProvider>
              </AppointmentProvider>
            </UserCarsProvider>
          </NewOffersProvider>
        </UserProvider>
      </AuthProvider>
    </LoadingProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
