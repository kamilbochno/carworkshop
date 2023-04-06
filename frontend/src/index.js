import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
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
import { BrowserRouter } from "react-router-dom";

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
