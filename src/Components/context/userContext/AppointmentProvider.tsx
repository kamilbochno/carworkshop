import React from "react";
import { createContext, useState, useContext } from "react";
import axios from "axios";
import LoadingContext from "../LoadingProvider.tsx";

const AppointmentContext = createContext({});

export const AppointmentProvider = ({ children }) => {
  const { setIsLoading } = useContext<any>(LoadingContext);
  const [appointment, setAppointment] = useState<any>([]);
  const [appointments, setAppointments] = useState<any>([]);
  const getUserAppointments = () => {
    setIsLoading(true);
    axios.get("/dashboard/appointments").then((response) => {
      let appointmentsData = response.data;
      setAppointments(appointmentsData);
      setIsLoading(false);
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
