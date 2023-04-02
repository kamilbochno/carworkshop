import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserCarsContext from "../../../context/userContext/UserCarsProvider.tsx";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function EditCar() {
  const {
    isOpenEditCar,
    setIsOpenEditCar,
    car,
    getCarsData,
    carsData,
    carModels,
    setCarModels,
    getCars
  } = useContext<any>(UserCarsContext);

  interface IFormInput {
    token: String;
    carBrand: String;
    carModel: String;
    engine: String;
    hp: String;
    year: Number;
    mileage: Number;
    vin: String;
    carId: String;
  }

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit
  } = useForm<IFormInput>({ criteriaMode: "all" });

  useEffect(() => {
    getCarsData();
  }, []);

  useEffect(() => {
    if (car) {
      reset({
        carBrand: car.CarBrand,
        carModel: car.CarModel,
        engine: car.Engine,
        hp: car.Hp,
        year: car.Year,
        mileage: car.Mileage,
        vin: car.VinNumber
      });
      let models = carsData.filter((x) => x.brand === car.CarBrand);
      setCarModels(models[0].models);
    }
  }, [car]);

  function handleChangeBrand(e) {
    const brand = e.target.value;
    let models = carsData.filter((x) => x.brand === brand);
    setCarModels(models[0].models);
  }

  function handleChangeModel(e) {
    console.log(e.target.value);
  }

  const date = new Date();
  const currentYear = date.getFullYear();
  const handleSubmitCar: SubmitHandler<IFormInput> = async (data) => {
    const token = localStorage.getItem("token");
    data.token = String(token);
    const carId = car._id;
    data.carId = String(carId);
    try {
      await axios.post("/dashboard/cars/edit", data).then((res) => {
        if (res.status === 201) {
          getCars();
          setIsOpenEditCar(false);
          toast.success("Car edited successfully!");
        }
      });
    } catch (err) {
      if (err.response.status === 400) {
        toast.error(err.response.data);
      }
    }
  };

  if (!isOpenEditCar) return null;

  return (
    <div className="fixed top-0 left-0 backdrop-brightness-50 backdrop-blur-sm z-0 h-full w-full">
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-between p-6 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold mx-auto">Edit car</h3>
              <button
                type="button"
                onClick={() => setIsOpenEditCar(false)}
                className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm inline-flex items-center"
                data-modal-hide="defaultModal">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="relative p-4 flex-auto">
              <form className="px-8 w-full" onSubmit={handleSubmit(handleSubmitCar)}>
                <div className="grid grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-black mt-3">
                      Select your car brand
                    </label>
                  </div>
                  <div>
                    <select
                      id="carBrand"
                      {...register("carBrand", { required: "Car brand is required" })}
                      onChange={handleChangeBrand}
                      className="border mb-2 border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value={""} selected disabled>
                        Select...
                      </option>
                      {carsData.map((cars) => (
                        <option key={cars._id} value={cars.brand}>
                          {cars.brand}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      errors={errors}
                      name="carBrand"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mt-3">
                      Select your car model
                    </label>
                  </div>
                  <div>
                    <select
                      id="carModel"
                      {...register("carModel", { required: "Car model is required" })}
                      onChange={handleChangeModel}
                      className="border mb-2 border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value={""} selected disabled>
                        Select...
                      </option>
                      {carModels.map((models) => (
                        <option value={models}>{models}</option>
                      ))}
                    </select>
                    <ErrorMessage
                      errors={errors}
                      name="carModel"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mt-3">Engine</label>
                  </div>
                  <div>
                    <input
                      {...register("engine", {
                        required: "Engine is required"
                      })}
                      className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="engine"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mt-3">Hp</label>
                  </div>
                  <div>
                    <input
                      {...register("hp", {
                        required: "Hp is required",
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "This input is number only"
                        }
                      })}
                      className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="hp"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mt-3">
                      Year of production
                    </label>
                  </div>
                  <div>
                    <input
                      {...register("year", {
                        required: "Year is required",
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "This input is number only"
                        },
                        min: {
                          value: 1900,
                          message: "Min year is 1900"
                        },
                        max: {
                          value: currentYear,
                          message: "Max year is " + currentYear
                        }
                      })}
                      className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="year"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mt-3">Car mileage</label>
                  </div>
                  <div>
                    <input
                      {...register("mileage", {
                        required: "Mileage is required",
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "This input is number only"
                        }
                      })}
                      className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="mileage"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mt-3">VIN number</label>
                  </div>
                  <div>
                    <input
                      {...register("vin", {
                        required: "VIN is required",
                        minLength: {
                          value: 17,
                          message: "VIN requires 17 characters"
                        }
                      })}
                      maxLength={17}
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black uppercase"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="vin"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </div>
                  <div className="flex justify-center items-center mt-6 col-span-2">
                    <button
                      className="text-white bg-blue-500 active:bg-yellow-700 font-bold text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg hover:bg-blue-600 outline-none focus:outline-none mr-1 mb-1"
                      type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCar;
