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
import DashboardNavigation from "./AdminDashboardNavigation/AdminDashboardNavigation.tsx";
import DashboardFooter from "./DashboardFooter/DashboardFooter.tsx";
import AppointmentContext from "../context/adminContext/AppointmentProvider.tsx";
import EmployeesContext from "../context/adminContext/EmployeesProvider.tsx";
import Appointments from "./Appointments/Appointments.tsx";
import ServicesHistory from "./ServiceHistory/ServicesHistory.tsx";
import EmployeesPaginated from "./Employees/EmployeesOverview.tsx";
import RecentPurchaseDetails from "./RecentPurchases/RecentPurchaseDetails/RecentPurchaseDetails.tsx";
import RecentPurchasesPaginated from "./RecentPurchases/RecentPurchases.tsx";
import RecentPurchaseEdit from "./RecentPurchases/RecentPurchaseEdit/RecentPurchaseEdit.tsx";
import Spinner from "../InfoElements/Spinner.tsx";
import { Toaster } from "react-hot-toast";

function AdminDashboard() {
  const { appointment, setAppointment, appointments, setAppointments, getAppointments } =
    useContext<any>(AppointmentContext);

  const { getEmployees, employees } = useContext<any>(EmployeesContext);

  useEffect(() => {
    getAppointments();
    getEmployees();
  }, []);

  return (
    <div className="main">
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
      <div className="bg-gray-100 py-6">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 border-b-2 border-gray-300">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
        <div className="mx-auto mt-6 max-w-7xl py-2 px-4 sm:px-6 lg:px-8">
          <div className="text-xl tracking-tight text-gray-600">Car repair shop</div>
        </div>
        <div className="h-full mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8">
            <div className="bg-white h-100 rounded-lg border-2 border-solid border-gray-300">
              <div className="mt-4 text-2xl tracking-tight text-gray-600 text-center">
                Services history
              </div>
              <div>
                <ServicesHistory />
              </div>
            </div>
            <div className="bg-white h-100 rounded-lg border-2 border-solid border-gray-300">
              <div className="mt-4 text-2xl tracking-tight text-gray-600 text-center">
                Employees overview
              </div>
              <div>
                <EmployeesPaginated itemsPerPage={5} />
              </div>
              <button className="w-24 h-8 flex mx-auto bg-blue-500 rounded-lg hover:bg-blue-600 mt-4 tracking-tight">
                <NavLink
                  to="/dashboard/admin/employees"
                  className="mt-1 mx-auto text-white text-center">
                  Manage
                </NavLink>
              </button>
            </div>
          </div>
          <div className="bg-white h-100 rounded-lg border-2 border-solid border-gray-300 mt-16">
            <div className="mt-4 text-2xl tracking-tight text-gray-600 text-center">
              Appointments
            </div>
            <Appointments />
          </div>
          <div className="mt-6 max-w-7xl py-2">
            <div className="text-xl tracking-tight text-gray-600">Car shop</div>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8 mt-6 h-96">
            <div className="col-span-2 bg-white rounded-lg border-2 border-solid border-gray-300">
              <div className="mt-4 text-2xl tracking-tight text-gray-600 text-center">
                Recent Purchases
              </div>
              <RecentPurchasesPaginated itemsPerPage={5} />
              <RecentPurchaseDetails />
              <RecentPurchaseEdit />
            </div>
          </div>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default AdminDashboard;
