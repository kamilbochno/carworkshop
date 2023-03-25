import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const ServicesHistoryContext = createContext({});

export const ServicesHistoryProvider = ({ children }) => {
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
    <ServicesHistoryContext.Provider
      value={{
        isOpenDetailsService,
        setIsOpenDetailsService,
        service,
        setService,
        services,
        setServices,
        getServices
      }}>
      {children}
    </ServicesHistoryContext.Provider>
  );
};

export default ServicesHistoryContext;
