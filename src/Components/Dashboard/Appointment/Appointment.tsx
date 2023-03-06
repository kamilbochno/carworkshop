import * as React from "react";
import * as ReactDOM from "react-dom";
import Footer from "../Footer/Footer.tsx";
import logo from "./logo.svg";
import { useState, useEffect } from "react";
import { NavLink, Routes, Route, useParams } from "react-router-dom";
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

function Appointment() {
  const [value, onChange] = useState(new Date());
  const day = value.getDate();
  const month = value.getMonth() + 1;
  const year = value.getFullYear();

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
  return (
    <main>
      <DashboardNavigation />
      <div className="bg-gray-100 mx-auto py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 border-b-2 border-gray-300">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Appointment</h1>
        </div>
        <div className="mt-8 mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border-2 border-solid border-gray-300">
            <div className="mt-4 text-2xl tracking-tight text-gray-600 text-center">
              Make an appointment
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-2 gap-x-4 pl-4 pr-4 mt-8">
              <div className="bg-white h-96 rounded-lg">
                <div className="mt-4 text-2xl tracking-tight text-gray-600 text-center">
                  Choose a date
                </div>
                <div className="mx-auto mt-6 max-w-4xl">
                  <Calendar
                    className="mx-auto"
                    minDate={new Date()}
                    locale="en"
                    tileDisabled={({ date }) => [0, 6].includes(date.getDay())}
                    onClickDay={console.log(value)}
                    onChange={onChange}
                    value={value}
                  />
                </div>
              </div>
              <div className="bg-white mb-8 rounded-lg">
                <div className="mt-4 text-2xl tracking-tight text-gray-600 text-center">
                  Fill details
                </div>
                <div className="mx-auto max-w-md">
                  <form action="#" method="POST">
                    <div className="overflow-hidden sm:rounded-md">
                      <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="">
                            <label
                              htmlFor="email-address"
                              className="block text-sm font-medium leading-6 text-gray-900">
                              Date
                            </label>
                            <input
                              type="text"
                              name="email-address"
                              id="email-address"
                              autoComplete="email"
                              value={day + "." + month + "." + year}
                              className="mt-2 pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>

                          <div className="">
                            <label
                              htmlFor="street-address"
                              className="block text-sm font-medium leading-6 text-gray-900">
                              Hours
                            </label>
                            <select
                              name="street-address"
                              id="street-address"
                              autoComplete="street-address"
                              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                              {appointmentHours.map((hour) => (
                                <option key={hour.hours}>{hour.hours}</option>
                              ))}
                            </select>
                          </div>
                          <div className="">
                            <label
                              htmlFor="street-address"
                              className="block text-sm font-medium leading-6 text-gray-900">
                              Phone number
                            </label>
                            <input
                              type="number"
                              name="street-address"
                              id="street-address"
                              autoComplete="street-address"
                              className="mt-2 pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>

                          <div className="">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium leading-6 text-gray-900">
                              Car
                            </label>
                            <select
                              name="city"
                              id="city"
                              autoComplete="address-level2"
                              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>

                          <div className="col-span-2">
                            <label
                              htmlFor="region"
                              className="block text-sm font-medium leading-6 text-gray-900">
                              Repair category
                            </label>
                            <select
                              name="region"
                              id="region"
                              autoComplete="address-level1"
                              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                              {repairCategory.map((category) => (
                                <option key={category.title}>{category.title}</option>
                              ))}
                            </select>
                          </div>

                          <div className="col-span-2">
                            <label
                              htmlFor="postal-code"
                              className="block text-sm font-medium leading-6 text-gray-900">
                              Description of the car problem
                            </label>
                            <textarea
                              maxLength={3000}
                              name="postal-code"
                              id="postal-code"
                              className="resize-none pl-2 h-24 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="px-4 pb-4 text-center sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                          Save
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
