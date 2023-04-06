import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const LoadingContext = createContext({});

export const LoadingProvider = ({ children }) => {
  const [loading, setIsLoading] = useState<any>(false);

  return (
    <LoadingContext.Provider value={{ loading, setIsLoading }}>{children}</LoadingContext.Provider>
  );
};

export default LoadingContext;
