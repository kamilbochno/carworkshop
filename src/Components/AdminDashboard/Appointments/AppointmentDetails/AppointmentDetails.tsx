import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppointmentContext from "../../../context/adminContext/AppointmentProvider.tsx";

function AppointmentDetails() {
  const { isOpenDetailsAppointment, setIsOpenDetailsAppointment, appointment } =
    useContext<any>(AppointmentContext);

  if (!isOpenDetailsAppointment) return null;

  return (
    <div className="fixed top-0 left-0 backdrop-brightness-50 backdrop-blur-sm z-10 h-full w-full">
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-between p-6 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold mx-auto">Appointment details</h3>
              <button
                type="button"
                onClick={() => setIsOpenDetailsAppointment(false)}
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
              <div className="grid grid-cols-2 gap-x-6">
                <div className="text-center">
                  <label className="block text-lg font-medium text-black mt-3">Date</label>
                  <div>{appointment.date}</div>
                  <label className="block text-lg font-medium text-black mt-3">Hours</label>
                  <div>{appointment.hours}</div>
                  <label className="block text-lg font-medium text-black mt-3">Phone</label>
                  <div>{appointment.phone}</div>
                  <label className="block text-lg font-medium text-black mt-3">Car</label>
                  <div>{appointment.car}</div>
                </div>
                <div className="text-center">
                  <label className="block text-lg font-medium text-black mt-3">
                    Repair Category
                  </label>
                  <div>{appointment.repairCategory}</div>
                  <label className="block text-lg font-medium text-black mt-3">Description</label>
                  <div>{appointment.description}</div>
                  <label className="block text-lg font-medium text-black mt-3">Status</label>
                  <div>{appointment.status}</div>
                  <label className="block text-lg font-medium text-black mt-3">Client</label>
                  <div>{appointment.client}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetails;
