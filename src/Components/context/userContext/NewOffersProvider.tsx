import React from "react";
import { createContext, useState, useContext } from "react";
import axios from "axios";
import LoadingContext from "../LoadingProvider.tsx";

const NewOffersContext = createContext({});

export const NewOffersProvider = ({ children }) => {
  const { setIsLoading } = useContext<any>(LoadingContext);
  const [newOffers, setNewOffers] = useState<any>([]);
  const getNewOffers = () => {
    setIsLoading(true);
    axios.get("/dashboard/newOffers").then((response) => {
      const data = response.data;
      setNewOffers(data);
      setIsLoading(false);
    });
  };
  return (
    <NewOffersContext.Provider value={{ newOffers, getNewOffers }}>
      {children}
    </NewOffersContext.Provider>
  );
};

export default NewOffersContext;
