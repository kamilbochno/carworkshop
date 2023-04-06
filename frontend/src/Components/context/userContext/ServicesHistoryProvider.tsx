import React from "react";
import { createContext, useState, useContext } from "react";
import axios from "axios";
import LoadingContext from "../LoadingProvider.tsx";

const ServicesHistoryContext = createContext({});

export const ServicesHistoryProvider = ({ children }) => {
  const { setIsLoading } = useContext<any>(LoadingContext);
  const [isOpenDetailsService, setIsOpenDetailsService] = useState(false);

  const [service, setService] = useState<any>([]);
  const [services, setServices] = useState<any>([]);
  const getServices = () => {
    setIsLoading(true);
    axios.get("/dashboard/services").then((response) => {
      let servicesData = response.data;
      console.log(response.data);
      setServices(servicesData);
      setIsLoading(false);
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
