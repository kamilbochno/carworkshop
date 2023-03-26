import React from "react";
import { createContext, useState, useContext } from "react";
import axios from "axios";
import LoadingContext from "../LoadingProvider.tsx";

const AdminAppointmentContext = createContext({});

export const AdminAppointmentProvider = ({ children }) => {
  const { setIsLoading } = useContext<any>(LoadingContext);
  const [isOpenEditAppointment, setIsOpenEditAppointment] = useState(false);
  const [isOpenDeleteAppointment, setIsOpenDeleteAppointment] = useState(false);
  const [isOpenDetailsAppointment, setIsOpenDetailsAppointment] = useState(false);

  const [appointment, setAppointment] = useState<any>([]);
  const [appointments, setAppointments] = useState<any>([]);
  const getAppointments = () => {
    setIsLoading(true);
    axios.get("/dashboard/admin/appointments").then((response) => {
      let appointmentsData = response.data;
      setAppointments(appointmentsData);
      setIsLoading(false);
    });
  };
  return (
    <AdminAppointmentContext.Provider
      value={{
        isOpenEditAppointment,
        setIsOpenEditAppointment,
        isOpenDeleteAppointment,
        setIsOpenDeleteAppointment,
        isOpenDetailsAppointment,
        setIsOpenDetailsAppointment,
        appointment,
        setAppointment,
        appointments,
        setAppointments,
        getAppointments
      }}>
      {children}
    </AdminAppointmentContext.Provider>
  );
};

export default AdminAppointmentContext;
