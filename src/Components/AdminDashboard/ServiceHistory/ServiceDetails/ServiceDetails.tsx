import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AdminServicesHistoryContext from "../../../context/adminContext/ServicesHistoryProvider.tsx";
import ServicePaginated from "./ServiceDetailsTable.tsx";

function ServiceDetails() {
  const { isOpenDetailsService, setIsOpenDetailsService, service } = useContext<any>(
    AdminServicesHistoryContext
  );

  if (!isOpenDetailsService) return null;

  return (
    <div className="fixed top-0 left-0 backdrop-brightness-50 z-10 h-full w-full">
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-between p-6 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold mx-auto">Service details</h3>
              <button
                type="button"
                onClick={() => setIsOpenDetailsService(false)}
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
              <ServicePaginated itemsPerPage={2} />
              <div className="grid grid-cols-3 gap-x-6">
                <div className="text-center">
                  <label className="block text-lg font-medium text-black mt-3">Date</label>
                  <div>{service.date}</div>
                  <label className="block text-lg font-medium text-black mt-3">Client</label>
                  <div>{service.firstName + " " + service.lastName}</div>
                </div>
                <div className="text-center">
                  <label className="block text-lg font-medium text-black mt-3">Car</label>
                  <div>{service.car}</div>
                  <label className="block text-lg font-medium text-black mt-3">Repair price</label>
                  <div>${service.repairPrice}</div>
                  <label className="block text-lg font-medium text-black mt-3">Parts price</label>
                  <div>${service.partsPrice}</div>
                </div>
                <div className="text-center">
                  <label className="block text-lg font-medium text-black mt-3">Total price</label>
                  <div>${Number(service.repairPrice) + Number(service.partsPrice)}</div>
                  <label className="block text-lg font-medium text-black mt-3">VIN number</label>
                  <div>{service.vin}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
