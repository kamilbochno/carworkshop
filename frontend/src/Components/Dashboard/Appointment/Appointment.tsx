import * as React from "react";
import * as ReactDOM from "react-dom";
import Footer from "../Footer/Footer.tsx";
import logo from "./logo.svg";
import { useState, useEffect, useContext } from "react";
import { NavLink, Routes, Route, useParams, useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import routes from "../routes/menu.tsx";
import { Box } from "@mui/material";
import Tabs from "@mui/material";
import Tab from "@mui/material";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import DashboardNavigation from "../DashboardNavigation/DashboardNavigation.tsx";
import DashboardFooter from "../DashboardFooter/DashboardFooter.tsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import UserCarsContext from "../../context/userContext/UserCarsProvider.tsx";
import UserContext from "../../context/userContext/UserProvider.tsx";
import axios from "axios";
import Spinner from "../../InfoElements/Spinner.tsx";
import toast, { Toaster } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function Appointment() {
  const { cars, getCars } = useContext<any>(UserCarsContext);
  const { profileInfo, getUserProfile } = useContext<any>(UserContext);

  const [date, setDate] = useState(new Date());
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const navigate = useNavigate();
  const appointmentHours = [
    {
      hours: "08:00-09:00"
    },
    {
      hours: "09:00-10:00"
    },
    {
      hours: "10:00-11:00"
    },
    {
      hours: "11:00-12:00"
    },
    {
      hours: "12:00-13:00"
    },
    {
      hours: "13:00-14:00"
    },
    {
      hours: "14:00-15:00"
    },
    {
      hours: "15:00-15:30"
    }
  ];
  const repairCategory = [
    {
      title: "Engine&Engine accessories"
    },
    {
      title: "Transmission system"
    },
    {
      title: "Oil change"
    },
    {
      title: "Car systems debugging"
    },
    {
      title: "Tire replacement"
    },
    {
      title: "Other"
    }
  ];

  useEffect(() => {
    getUserProfile();
    getCars();
  }, []);

  interface IFormInput {
    token: String;
    carId: String;
    date: String;
    hours: String;
    phone: Number;
    car: String;
    repairCategory: String;
    description: String;
    status: String;
    client: String;
  }

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit
  } = useForm<IFormInput>({ criteriaMode: "all" });

  const handleSubmitAppointment: SubmitHandler<IFormInput> = async (data) => {
    const token = localStorage.getItem("token");
    data.token = String(token);
    const carId = cars[Number(data.car)]._id;
    data.carId = String(carId);
    const client = profileInfo.FirstName + " " + profileInfo.LastName;
    data.client = String(client);
    const car = cars[Number(data.car)].CarBrand + " " + cars[Number(data.car)].CarModel;
    data.car = car;
    data.status = "Pending";
    console.log(data);
    try {
      await axios.post("/dashboard/appointment/add", data).then((res) => {
        if (res.status === 201) {
          toast.success(res.data);
          setTimeout(() => {
            navigate("/dashboard/");
          }, 3500);
        }
      });
    } catch (err) {
      if (err.response.status === 400) {
        toast.error(err.response.data);
      }
    }
  };

  return (
    <main>
      <DashboardNavigation />
      <Spinner />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000
        }}
      />
      <div className="bg-gray-100 mx-auto py-6 sm:px-6 lg:px-8 lg:h-screen">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 border-b-2 border-gray-300">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Appointment</h1>
        </div>
        <div className="mt-4 mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border-2 border-solid border-gray-300">
            <div className="mt-4 text-2xl tracking-tight text-gray-600 text-center">
              Make an appointment
            </div>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-x-4 pl-4 pr-4 mt-2">
              <div className=" bg-white rounded-lg">
                <div className="mt-4 text-2xl tracking-tight text-gray-600 text-center">
                  Choose a date
                </div>
                <div className="mx-auto mt-6 max-w-4xl">
                  <Calendar
                    className="mx-auto"
                    minDate={new Date()}
                    locale="en"
                    tileDisabled={({ date }) => [0, 6].includes(date.getDay())}
                    onChange={setDate}
                    value={date}
                  />
                </div>
              </div>
              <div className="bg-white rounded-lg">
                <div className="mt-4 text-2xl tracking-tight text-gray-600 text-center">
                  Fill details
                </div>
                <div className="mx-auto max-w-md">
                  <form onSubmit={handleSubmit(handleSubmitAppointment)}>
                    <div className="overflow-hidden sm:rounded-md">
                      <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols- gap-2">
                          <div className="">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Date
                            </label>
                            <input
                              type="text"
                              {...register("date")}
                              id="date"
                              value={day + "." + month + "." + year}
                              className="mt-2 pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>

                          <div className="">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Hours
                            </label>
                            <select
                              {...register("hours", {
                                required: "Hours is required"
                              })}
                              id="hours"
                              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                              <option value={""} selected disabled>
                                Select...
                              </option>
                              {appointmentHours.map((hour) => (
                                <option key={hour.hours}>{hour.hours}</option>
                              ))}
                            </select>
                            <ErrorMessage
                              errors={errors}
                              name="hours"
                              render={({ messages }) =>
                                messages &&
                                Object.entries(messages).map(([type, message]) => (
                                  <p className="text-sm text-red-500 mt-2 ml-1" key={type}>
                                    {message}
                                  </p>
                                ))
                              }
                            />
                          </div>
                          <div className="">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Phone number
                            </label>
                            <input
                              {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                  value: /^[0-9]*$/,
                                  message: "This input is number only"
                                }
                              })}
                              defaultValue={profileInfo.PhoneNumber}
                              id="phone"
                              className="mt-2 pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage
                              errors={errors}
                              name="phone"
                              render={({ messages }) =>
                                messages &&
                                Object.entries(messages).map(([type, message]) => (
                                  <p className="text-sm text-red-500 mt-2 ml-1" key={type}>
                                    {message}
                                  </p>
                                ))
                              }
                            />
                          </div>

                          <div className="">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Car
                            </label>
                            <select
                              {...register("car", {
                                required: "Car is required"
                              })}
                              id="car"
                              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                              <option value={""} selected disabled>
                                Select...
                              </option>
                              {cars.map((car, index) => (
                                <option value={index}>
                                  {car.CarBrand} {car.CarModel}
                                </option>
                              ))}
                            </select>
                            <ErrorMessage
                              errors={errors}
                              name="car"
                              render={({ messages }) =>
                                messages &&
                                Object.entries(messages).map(([type, message]) => (
                                  <p className="text-sm text-red-500 mt-2 ml-1" key={type}>
                                    {message}
                                  </p>
                                ))
                              }
                            />
                          </div>

                          <div className="col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Repair category
                            </label>
                            <select
                              {...register("repairCategory", {
                                required: "Repair category is required"
                              })}
                              id="repairCategory"
                              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                              <option value={""} selected disabled>
                                Select...
                              </option>
                              {repairCategory.map((category) => (
                                <option key={category.title}>{category.title}</option>
                              ))}
                            </select>
                            <ErrorMessage
                              errors={errors}
                              name="repairCategory"
                              render={({ messages }) =>
                                messages &&
                                Object.entries(messages).map(([type, message]) => (
                                  <p className="text-sm text-red-500 mt-2 ml-1" key={type}>
                                    {message}
                                  </p>
                                ))
                              }
                            />
                          </div>

                          <div className="col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Description of the car problem
                            </label>
                            <textarea
                              maxLength={3000}
                              {...register("description", {
                                required: "Description is required",
                                minLength: {
                                  value: 20,
                                  message: "Description requires min 20 characters"
                                }
                              })}
                              id="description"
                              className="resize-none pl-2 h-24 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage
                              errors={errors}
                              name="description"
                              render={({ messages }) =>
                                messages &&
                                Object.entries(messages).map(([type, message]) => (
                                  <p className="text-sm text-red-500 mt-2 ml-1" key={type}>
                                    {message}
                                  </p>
                                ))
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="px-4 pb-4 text-center sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-blue-500 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
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
      </div>
      <DashboardFooter />
    </main>
  );
}

export default Appointment;
