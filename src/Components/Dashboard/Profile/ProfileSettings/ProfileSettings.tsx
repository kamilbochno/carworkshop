import * as React from "react";
import * as ReactDOM from "react-dom";
import Footer from "../Footer/Footer.tsx";
import logo from "./logo.svg";
import { useState, useEffect, useContext } from "react";
import { NavLink, Routes, Route, useParams, useNavigate } from "react-router-dom";
import DashboardNavigation from "../../DashboardNavigation/DashboardNavigation.tsx";
import DashboardFooter from "../../DashboardFooter/DashboardFooter.tsx";
import UserContext from "../../../context/userContext/UserProvider.tsx";
import axios from "axios";

function ProfileDetails() {
  const { profileInfo, setProfileInfo, getUserProfile } = useContext<any>(UserContext);
  const navigate = useNavigate();
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

  const handleSubmitProfileInfo = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const profileData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      phoneNumber: e.target.phoneNumber.value,
      country: e.target.country.value,
      street: e.target.street.value,
      city: e.target.city.value,
      stateProvince: e.target.stateProvince.value,
      zipPostal: e.target.zipPostal.value,
      token: token
    };
    if (profileData.firstName && profileData.lastName && profileData.email) {
      try {
        const profile = await axios.post("/dashboard/profile/edit", profileData).then((res) => {
          if (res.status === 201) {
            getUserProfile();
            navigate("/dashboard/profile");
            console.log(res.data);
          }
        });
      } catch (err) {
        if (err.response.status === 400) {
          console.log(err.response.data);
        }
      }
    }
  };
  return (
    <div className="main">
      <DashboardNavigation />
      <main>
        <div className="bg-gray-100 mx-auto py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 border-b-2 border-gray-300">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile settings</h1>
          </div>
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg border-2 border-solid border-gray-300">
              <div className="mt-4 text-3xl tracking-tight text-gray-800 font-semibold ml-6 text-center">
                Edit profile
              </div>
              <div className="ml-6 mt-4 mx-auto">
                <img
                  className="mx-auto h-24 w-24 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""></img>
              </div>
              <form onSubmit={handleSubmitProfileInfo}>
                <div className="grid grid-cols-2 lg:grid-cols-3 mt-6 gap-x-6 gap-y-6 mx-auto max-w-5xl text-center">
                  <div>
                    <div className="mt-4 text-xl tracking-tight font-semibold text-black">
                      First name
                    </div>
                    <input
                      name="firstName"
                      defaultValue={profileInfo.FirstName}
                      className="mt-2 pl-2 block mx-auto max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                  </div>
                  <div>
                    <div className="mt-4 text-xl tracking-tight font-semibold text-black">
                      Last name
                    </div>
                    <input
                      name="lastName"
                      defaultValue={profileInfo.LastName}
                      className="mt-2 pl-2 block mx-auto max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                  </div>
                  <div>
                    <div className="mt-4 text-xl tracking-tight font-semibold text-black">
                      Email address
                    </div>
                    <input
                      name="email"
                      defaultValue={profileInfo.Email}
                      className="mt-2 pl-2 block mx-auto max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                  </div>
                  <div>
                    <div className="mt-4 text-xl tracking-tight font-semibold text-black">
                      Phone number
                    </div>
                    <input
                      name="phoneNumber"
                      defaultValue={profileInfo.PhoneNumber}
                      className="mt-2 pl-2 block mx-auto max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                  </div>
                  <div>
                    <div className="mt-4 text-xl tracking-tight font-semibold text-black">
                      Country
                    </div>
                    <input
                      name="country"
                      defaultValue={profileInfo.Country}
                      className="mt-2 pl-2 block mx-auto max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                  </div>
                  <div>
                    <div className="mt-4 text-xl tracking-tight font-semibold text-black">
                      Street address
                    </div>
                    <input
                      name="street"
                      defaultValue={profileInfo.Street}
                      className="mt-2 pl-2 block mx-auto max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                  </div>
                  <div>
                    <div className="mt-4 text-xl tracking-tight font-semibold text-black">City</div>
                    <input
                      name="city"
                      defaultValue={profileInfo.City}
                      className="mt-2 pl-2 block mx-auto max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                  </div>
                  <div>
                    <div className="mt-4 text-xl tracking-tight font-semibold text-black">
                      State / Province
                    </div>
                    <input
                      name="stateProvince"
                      defaultValue={profileInfo.StateProvince}
                      className="mt-2 pl-2 block mx-auto max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                  </div>
                  <div>
                    <div className="mt-4 text-xl tracking-tight font-semibold text-black">
                      ZIP / Postal code
                    </div>
                    <input
                      name="zipPostal"
                      defaultValue={profileInfo.ZipPostal}
                      className="mt-2 pl-2 block mx-auto max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                  </div>
                </div>
                <div className="ml-6 text-center">
                  <button
                    type="submit"
                    className="mt-4 mx-auto text-white uppercase text-center w-24 h-8 bg-blue-500 rounded-lg hover:bg-blue-600 mt-6 mb-4 tracking-tight">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <DashboardFooter />
    </div>
  );
}

export default ProfileDetails;
