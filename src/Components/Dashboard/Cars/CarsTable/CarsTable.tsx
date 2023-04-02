import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect, useContext } from "react";
import { NavLink, Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
import UserCarsContext from "../../../context/userContext/UserCarsProvider.tsx";

function CarsTable() {
  const { setIsOpenAddCar, setIsOpenEditCar, setIsOpenDeleteCar, cars, getCars, setCar, car } =
    useContext<any>(UserCarsContext);
  console.log(cars);
  useEffect(() => {
    getCars();
  }, []);
  function editCar(carInfo) {
    setCar(carInfo);
    console.log(car);
    setIsOpenEditCar(true);
  }

  function deleteCar(carInfo) {
    setCar(carInfo);

    setIsOpenDeleteCar(true);
  }

  return (
    <main>
      <div className="bg-gray-100 lg:h-screen mx-auto py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 border-b-2 border-gray-300">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">My cars</h1>
        </div>
        <div className="mt-8 mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setIsOpenAddCar(true)}
            className="bg-blue-500 hover:bg-blue-600 h-10 w-20 rounded-lg text-white mb-4 text-sm font-semibold">
            Add car
          </button>
          <div className="bg-white rounded-lg border-2 border-solid border-gray-300 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 ">
                    Brand
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
                    Model
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
                    Engine
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
                    Hp
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 ">
                    Year
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 ">
                    Mileage
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 ">
                    VIN
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "></th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "></th>
                </tr>
              </thead>

              <tbody id="carTable" className="divide-y divide-gray-200">
                {cars.map((car, index) => (
                  <tr id={car._id} key={index}>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {car.CarBrand}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {car.CarModel}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {car.Engine}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{car.Hp}</td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {car.Year}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {car.Mileage}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {car.VinNumber}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <button
                        onClick={() => editCar(cars[index])}
                        className="text-green-500 hover:text-green-700">
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <button
                        onClick={() => deleteCar(cars[index])}
                        className="text-red-500 hover:text-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CarsTable;
