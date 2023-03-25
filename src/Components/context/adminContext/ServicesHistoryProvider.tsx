import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AdminServicesHistoryContext = createContext({});

export const AdminServicesHistoryProvider = ({ children }) => {
  const [isOpenAddService, setIsOpenAddService] = useState(false);
  const [isOpenEditService, setIsOpenEditService] = useState(false);
  const [isOpenDeleteService, setIsOpenDeleteService] = useState(false);
  const [isOpenDetailsService, setIsOpenDetailsService] = useState(false);

  const [service, setService] = useState<any>([]);
  const [services, setServices] = useState<any>([]);
  const getServices = () => {
    axios.get("/dashboard/admin/services").then((response) => {
      let servicesData = response.data;
      console.log(response.data);
      setServices(servicesData);
    });
  };
  return (
    <AdminServicesHistoryContext.Provider
      value={{
        isOpenAddService,
        setIsOpenAddService,
        isOpenEditService,
        setIsOpenEditService,
        isOpenDeleteService,
        setIsOpenDeleteService,
        isOpenDetailsService,
        setIsOpenDetailsService,
        service,
        setService,
        services,
        setServices,
        getServices
      }}>
      {children}
    </AdminServicesHistoryContext.Provider>
  );
};

export default AdminServicesHistoryContext;
