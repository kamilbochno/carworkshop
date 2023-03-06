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
import DashboardNavigation from "../../DashboardNavigation/DashboardNavigation.tsx";
import DashboardFooter from "../../DashboardFooter/DashboardFooter.tsx";

function ProfileDetails() {
  const account = [
    {
      title: "First name",
      content: "John"
    },
    {
      title: "Last name",
      content: "Doe"
    },
    {
      title: "Email address",
      content: "johndoe@gmail.com"
    },
    {
      title: "Phone number",
      content: "123456789"
    },
    {
      title: "Country",
      content: "123456789"
    },
    {
      title: "Street address",
      content: "daa"
    },
    {
      title: "City",
      content: "New york"
    },
    {
      title: "State / Province",
      content: "Ohio"
    },
    {
      title: "ZIP / Postal code",
      content: "31-422"
    }
  ];

  return (
    <div className="main">
      <DashboardNavigation />
      <main>
        <div className="bg-gray-100 mx-auto py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 border-b-2 border-gray-300">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile details</h1>
          </div>
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg border-2 border-solid border-gray-300">
              <div className="mt-4 text-3xl tracking-tight text-gray-800 font-semibold ml-6 text-center">
                My profile
              </div>
              <div className="ml-6 mt-4 mx-auto">
                <img
                  className="mx-auto h-24 w-24 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""></img>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 mt-6 gap-x-6 gap-y-6 mx-auto max-w-5xl text-center">
                {account.map((info) => (
                  <div>
                    <div
                      key={info.title}
                      className="mt-4 text-xl tracking-tight font-semibold text-black ml-6">
                      {info.title}
                    </div>
                    <div
                      key={info.title}
                      className="mt-4 text-lg tracking-tight text-gray-600 ml-6">
                      {info.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="ml-6 text-center">
                <button className="w-24 h-8 bg-blue-500 rounded-lg hover:bg-blue-600 mt-6 mb-4 tracking-tight">
                  <NavLink
                    to="/dashboard/profile/settings"
                    className="mt-1 mx-auto text-white text-center">
                    Edit
                  </NavLink>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <DashboardFooter />
    </div>
  );
}

export default ProfileDetails;
