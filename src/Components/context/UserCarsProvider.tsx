import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserCarsContext = createContext({});

export const UserCarsProvider = ({ children }) => {
  const [isOpenAddCar, setIsOpenAddCar] = useState(false);
  const [isOpenEditCar, setIsOpenEditCar] = useState(false);
  const [isOpenDeleteCar, setIsOpenDeleteCar] = useState(false);

  const [car, setCar] = useState();

  const [carsData, setCarsData] = useState<any>([]);
  const [carModels, setCarModels] = useState<any>([]);

  const getCarsData = () => {
    axios.get("/dashboard/cars/addcar/getCars").then((response) => {
      let carsData = response.data;
      setCarsData(carsData);
    });
  };

  const [cars, setCars] = useState<any>([]);
  const getCars = () => {
    const token = { token: localStorage.getItem("token") };
    axios.post("/dashboard/cars", token).then((response) => {
      setCars(response.data);
      console.log(token);
    });
  };

  return (
    <UserCarsContext.Provider
      value={{
        isOpenAddCar,
        setIsOpenAddCar,
        isOpenEditCar,
        setIsOpenEditCar,
        isOpenDeleteCar,
        setIsOpenDeleteCar,
        cars,
        setCars,
        car,
        setCar,
        carsData,
        carModels,
        getCarsData,
        setCarModels,
        getCars
      }}>
      {children}
    </UserCarsContext.Provider>
  );
};

export default UserCarsContext;
