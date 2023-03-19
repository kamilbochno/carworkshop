import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AppointmentContext = createContext({});

export const AppointmentProvider = ({ children }) => {
  const [appointment, setAppointment] = useState<any>([]);
  const [appointments, setAppointments] = useState<any>([]);
  const getUserAppointments = () => {
    axios.get("/dashboard/appointments").then((response) => {
      let appointmentsData = response.data;
      console.log(response.data);
      setAppointments(appointmentsData);
    });
  };
  return (
    <AppointmentContext.Provider
      value={{ appointment, setAppointment, appointments, setAppointments, getUserAppointments }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContext;
