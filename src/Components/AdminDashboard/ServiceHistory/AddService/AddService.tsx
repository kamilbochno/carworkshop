import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AdminServicesHistoryContext from "../../../context/adminContext/ServicesHistoryProvider.tsx";
import toast from "react-hot-toast";
function AddService() {
  const { isOpenAddService, setIsOpenAddService, getServices } = useContext<any>(
    AdminServicesHistoryContext
  );

  useEffect(() => {}, []);

  const handleSubmitService = async (e) => {
    e.preventDefault();

    const serviceData = {
      date: e.target.date.value,
      client: e.target.client.value,
      car: e.target.car.value,
      repairPrice: e.target.repairPrice.value,
      partsPrice: e.target.partsPrice.value,
      vin: e.target.vin.value
    };
    if (
      serviceData.date &&
      serviceData.client &&
      serviceData.car &&
      serviceData.repairPrice &&
      serviceData.partsPrice &&
      serviceData.vin
    ) {
      try {
        await axios.post("/dashboard/admin/services/add", serviceData).then((res) => {
          if (res.status === 201) {
            setIsOpenAddService(false);
            getServices();
            toast.success(res.data);
          }
        });
      } catch (err) {
        if (err.response.status === 400) {
          toast.error(err.response.data);
        }
      }
    }
    console.log(serviceData);
  };
  if (!isOpenAddService) return null;

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-center justify-between p-6 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font=semibold mx-auto">Add new service</h3>
            <button
              type="button"
              onClick={() => setIsOpenAddService(false)}
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
            <form className="px-8 w-full" onSubmit={handleSubmitService}>
              <div className="grid grid-cols-2">
                <label className="block text-sm font-medium text-black mt-3">Date</label>
                <input
                  name="date"
                  className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                />
                <label className="block text-sm font-medium text-black mt-3">Client</label>
                <input
                  name="client"
                  className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                />
                <label className="block text-sm font-medium text-black mt-3">Car</label>
                <input
                  name="car"
                  className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                />
                <label className="block text-sm font-medium text-black mt-3">Repair price</label>
                <input
                  name="repairPrice"
                  className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                />
                <label className="block text-sm font-medium text-black mt-3">Parts price</label>
                <input
                  name="partsPrice"
                  className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                />
                <label className="block text-sm font-medium text-black mt-3">VIN number</label>
                <input
                  name="vin"
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                />
                <div className="flex justify-center items-center mt-6 col-span-2">
                  <button
                    className="text-white bg-blue-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg hover:bg-blue-600 outline-none focus:outline-none mr-1 mb-1"
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
  );
}

export default AddService;
