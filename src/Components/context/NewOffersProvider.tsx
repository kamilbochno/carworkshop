import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const NewOffersContext = createContext({});

export const NewOffersProvider = ({ children }) => {
  const [newOffers, setNewOffers] = useState<any>([]);
  const getNewOffers = () => {
    axios.get("/dashboard/newOffers").then((response) => {
      const data = response.data;
      setNewOffers(data);
    });
  };
  return (
    <NewOffersContext.Provider value={{ newOffers, getNewOffers }}>
      {children}
    </NewOffersContext.Provider>
  );
};

export default NewOffersContext;
