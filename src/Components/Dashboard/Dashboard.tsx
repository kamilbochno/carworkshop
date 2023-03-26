import * as React from "react";
import * as ReactDOM from "react-dom";
import Footer from "../Footer/Footer.tsx";
import logo from "./logo.svg";
import { useState, useEffect, useContext } from "react";
import { NavLink, Routes, Route, useParams } from "react-router-dom";
import { Container } from "@mui/system";
import routes from "../routes/menu.tsx";
import { Box } from "@mui/material";
import Tabs from "@mui/material";
import Tab from "@mui/material";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";
import { Carousel } from "react-responsive-carousel";
import DashboardNavigation from "./DashboardNavigation/DashboardNavigation.tsx";
import DashboardFooter from "./DashboardFooter/DashboardFooter.tsx";
import NewOffersContext from "../context/userContext/NewOffersProvider.tsx";
import UserCarsContext from "../context/userContext/UserCarsProvider.tsx";
import AppointmentContext from "../context/userContext/AppointmentProvider.tsx";
import ServicesHistoryPaginated from "./DashboardTables/ServicesHistoryTable.tsx";
import CarsOverviewPaginated from "./DashboardTables/CarsOverviewTable.tsx";
import AppointmentsPaginated from "./DashboardTables/AppointmentsTable.tsx";
import Spinner from "../InfoElements/Spinner.tsx";
import { Toaster } from "react-hot-toast";

function Dashboard() {
  const { newOffers, getNewOffers } = useContext<any>(NewOffersContext);

  const { appointments, getUserAppointments } = useContext<any>(AppointmentContext);

  useEffect(() => {
    getNewOffers();
  }, []);

  return (
    <div className="main">
      <Spinner />
      <DashboardNavigation />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000
        }}
      />
      <div className="bg-gray-100 py-6">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 border-b-2 border-gray-300">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
        <div className="mx-auto mt-6 max-w-7xl py-2 px-4 sm:px-6 lg:px-8">
          <div className="text-xl tracking-tight text-gray-600">Car repair shop</div>
        </div>
        <div className="h-full mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8">
            <div className="bg-white h-96 rounded-lg border-2 border-solid border-gray-300">
              <div className="mt-4 text-2xl tracking-tight text-gray-600 text-center">
                Service history
              </div>
              <div className="mt-4 relative overflow-x-auto">
                <div>
                  <ServicesHistoryPaginated itemsPerPage={5} />
                </div>
              </div>
            </div>
            <div className="bg-white h-96 rounded-lg border-2 border-solid border-gray-300">
              <div className="mt-4 text-2xl tracking-tight text-gray-600 text-center">
                Cars overview
              </div>
              <div className="mt-4 relative overflow-x-auto">
                <CarsOverviewPaginated itemsPerPage={5} />
                <button className="w-24 h-8 flex mx-auto bg-blue-500 rounded-lg hover:bg-blue-600 mt-4 tracking-tight">
                  <NavLink to="/dashboard/cars" className="mt-1 mx-auto text-white text-center">
                    Manage
                  </NavLink>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 bg-white h-96 rounded-lg border-2 border-solid border-gray-300">
            <div className="mt-4 text-2xl tracking-tight text-gray-600 text-center">
              Appointments
            </div>
            <div className="mt-4 relative overflow-x-auto">
              <AppointmentsPaginated itemsPerPage={5} />
              <button className="w-24 h-8 flex mx-auto bg-blue-500 rounded-lg hover:bg-blue-600 mt-4 tracking-tight">
                <NavLink
                  to="/dashboard/appointment"
                  className="mt-1 mx-auto text-white text-center">
                  Add
                </NavLink>
              </button>
            </div>
          </div>
          <div className="mt-6 max-w-7xl py-2">
            <div className="text-xl tracking-tight text-gray-600">Car shop</div>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8 mt-6 h-96">
            <div className="bg-white rounded-lg border-2 border-solid border-gray-300">
              <div className="mt-4 text-2xl tracking-tight text-gray-600 text-center">
                Order history
              </div>
              <table className="mt-4 h-64 bg-gray-50 min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 uppercase">
                  <tr className="">
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 ">
                      Order number
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
                      Last modified
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 ">
                      Total price
                    </th>
                  </tr>
                </thead>
                <tbody id="carTable" className="divide-y divide-gray-200">
                  <tr></tr>
                </tbody>
              </table>
            </div>
            <div className="bg-white rounded-lg border-2 border-solid border-gray-300">
              <div className="mt-4 text-2xl tracking-tight text-gray-600 text-center">
                New offers
              </div>
              <div className="mx-auto mt-8 max-w-4xl">
                <Carousel
                  autoPlay
                  infiniteLoop
                  showStatus={false}
                  showArrows={false}
                  showIndicators={false}
                  transitionTime={700}>
                  {newOffers.map((offer) => (
                    <div key={offer.title}>
                      <div className="flex mx-auto text-center h-32 w-32 pb-8 items-center justify-center rounded-lg">
                        <img className="" src={offer.src} alt="productimg" />
                      </div>
                      <div className="flex mx-auto mt-8 items-center justify-center text-base font-semibold leading-7 text-gray-900">
                        {offer.title}
                      </div>
                      <div className="flex mx-auto mt-2 items-center justify-center text-base font-semibold leading-7 text-blue-500">
                        {offer.price}
                      </div>
                    </div>
                  ))}
                </Carousel>
                <button className="w-24 h-8 mb-4 flex mx-auto bg-blue-500 rounded-lg hover:bg-blue-600 tracking-tight">
                  <NavLink to="/dashboard/shop" className="mt-1 mx-auto text-white text-center">
                    Shop now
                  </NavLink>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default Dashboard;
