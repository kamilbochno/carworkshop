import React from "react";
import { createContext, useState, useContext } from "react";
import axios from "axios";
import LoadingContext from "../LoadingProvider.tsx";

const AdminServicesHistoryContext = createContext({});

export const AdminServicesHistoryProvider = ({ children }) => {
  const { setIsLoading } = useContext<any>(LoadingContext);
  const [isOpenAddService, setIsOpenAddService] = useState(false);
  const [isOpenEditService, setIsOpenEditService] = useState(false);
  const [isOpenDeleteService, setIsOpenDeleteService] = useState(false);
  const [isOpenDetailsService, setIsOpenDetailsService] = useState(false);

  const [service, setService] = useState<any>([]);
  const [services, setServices] = useState<any>([]);
  const getServices = () => {
    setIsLoading(true);
    axios.get("/dashboard/admin/services").then((response) => {
      let servicesData = response.data;
      setServices(servicesData);
      setIsLoading(false);
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
