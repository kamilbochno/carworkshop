import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AdminAppointmentContext = createContext({});

export const AdminAppointmentProvider = ({ children }) => {
  const [isOpenEditAppointment, setIsOpenEditAppointment] = useState(false);
  const [isOpenDeleteAppointment, setIsOpenDeleteAppointment] = useState(false);
  const [isOpenDetailsAppointment, setIsOpenDetailsAppointment] = useState(false);

  const [appointment, setAppointment] = useState<any>([]);
  const [appointments, setAppointments] = useState<any>([]);
  const getAppointments = () => {
    axios.get("/dashboard/admin/appointments").then((response) => {
      let appointmentsData = response.data;
      console.log(response.data);
      setAppointments(appointmentsData);
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
