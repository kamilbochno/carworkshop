import React from "react";
import { createContext, useState, useContext } from "react";
import axios from "axios";
import LoadingContext from "../LoadingProvider.tsx";

const UserCarsContext = createContext({});

export const UserCarsProvider = ({ children }) => {
  const { setIsLoading } = useContext<any>(LoadingContext);
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
    setIsLoading(true);
    axios.get("/dashboard/cars").then((response) => {
      setCars(response.data);
      setIsLoading(false);
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
