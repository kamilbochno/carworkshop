import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AppointmentContext = createContext({});

export const AppointmentProvider = ({ children }) => {
  const [appointment, setAppointment] = useState<any>([]);
  const getUserProfile = () => {
    const token = { token: localStorage.getItem("token") };
  };
  return (
    <AppointmentContext.Provider value={{ appointment, setAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContext;
