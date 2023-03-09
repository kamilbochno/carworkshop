import React from "react";
import { createContext, useState } from "react";
import axios from "axios";

const ShopContext = createContext({});

export const ShopProvider = ({ children }) => {
  const [engineOils, setEngineOils] = useState<any>([]);
  const getEngineOils = () => {
    axios.get("/dashboard/shop/engineoils").then((response) => {
      const data = response.data;
      setEngineOils(data);
    });
  };
  return (
    <ShopContext.Provider value={{ engineOils, setEngineOils, getEngineOils }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
