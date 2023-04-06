import * as React from "react";
import * as ReactDOM from "react-dom";
import Footer from "../Footer/Footer.tsx";
import logo from "./logo.svg";
import { useState, useEffect, useContext } from "react";
import { NavLink, Routes, Route, useParams } from "react-router-dom";
import DashboardNavigation from "../../DashboardNavigation/DashboardNavigation.tsx";
import DashboardFooter from "../../DashboardFooter/DashboardFooter.tsx";
import UserContext from "../../../context/UserProvider.tsx";

function ProfileDetails() {
  const { profileInfo, setProfileInfo, getUserProfile } = useContext<any>(UserContext);

  const account = [
    {
      title: "First name",
      content: profileInfo.FirstName
    },
    {
      title: "Last name",
      content: profileInfo.LastName
    },
    {
      title: "Email address",
      content: profileInfo.Email
    },
    {
      title: "Phone number",
      content: profileInfo.PhoneNumber
    },
    {
      title: "Country",
      content: profileInfo.Country
    },
    {
      title: "Street address",
      content: profileInfo.Street
    },
    {
      title: "City",
      content: profileInfo.City
    },
    {
      title: "State / Province",
      content: profileInfo.StateProvince
    },
    {
      title: "ZIP / Postal code",
      content: profileInfo.ZipPostal
    }
  ];
  useEffect(() => {
    getUserProfile();
  }, []);

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
                      key={info.content}
                      className="mt-4 text-lg tracking-tight text-gray-600 ml-6">
                      {info.content ? info.content : "No information"}
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
