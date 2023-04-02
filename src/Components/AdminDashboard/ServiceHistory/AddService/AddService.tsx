import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AdminServicesHistoryContext from "../../../context/adminContext/ServicesHistoryProvider.tsx";
import WarehouseContext from "../../../context/adminContext/WarehouseProvider.tsx";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ServicePartsPaginated from "./ServicePartsTable.tsx";
import AddPart from "./AddPart.tsx";

function AddService() {
  const {
    isOpenAddService,
    setIsOpenAddService,
    getServices,
    setIsOpenAddPartService,
    serviceParts,
    getUsers,
    users
  } = useContext<any>(AdminServicesHistoryContext);

  const { getCarRepairShopItems, carRepairShopItems } = useContext<any>(WarehouseContext);

  interface IFormInput {
    partsPrice: Number;
    repairPrice: Number;
    date: String;
    clientId: String;
    firstName: String;
    lastName: String;
    client: String;
    car: String;
    vin: String;
    parts: Object;
  }

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IFormInput>({ criteriaMode: "all" });

  useEffect(() => {
    getCarRepairShopItems();
    getUsers();
  }, []);

  const handleSubmitService: SubmitHandler<IFormInput> = async (data) => {
    data.parts = serviceParts;
    data.clientId = users[data.client]._id;
    data.firstName = users[data.client].FirstName;
    data.lastName = users[data.client].LastName;
    try {
      await axios.post("/dashboard/admin/services/add", data).then((res) => {
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
  };

  if (!isOpenAddService) return null;

  return (
    <div className="fixed top-0 left-0 backdrop-brightness-50 backdrop-blur-sm z-10 h-full w-full">
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-between p-6 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-2xl font=semibold mx-auto">Add new service</h3>
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
              <div className="flex justify-center items-center col-span-2">
                <button
                  onClick={() => setIsOpenAddPartService(true)}
                  className="text-white bg-blue-500 active:bg-yellow-700 font-bold text-sm px-3 py-2 rounded-lg shadow hover:shadow-lg hover:bg-blue-600 outline-none focus:outline-none mr-1 mb-1"
                  type="submit">
                  Add part
                </button>
              </div>
              <ServicePartsPaginated itemsPerPage={2} />
              <AddPart />
              <form className=" w-full" onSubmit={handleSubmit(handleSubmitService)}>
                <div className="grid grid-cols-3 gap-x-6">
                  <div>
                    <label className="block text-sm font-medium text-black mt-3">Parts price</label>
                    <input
                      {...register("partsPrice", {
                        required: "Parts price is required"
                      })}
                      className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="partsPrice"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mt-3">
                      Repair price
                    </label>
                    <input
                      {...register("repairPrice", {
                        required: "Repair price is required"
                      })}
                      className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="repairPrice"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mt-3">Date</label>
                    <input
                      {...register("date", {
                        required: "Date is required"
                      })}
                      className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="date"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mt-3">Client</label>
                    <select
                      {...register("client", {
                        required: "Client is required"
                      })}
                      className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black focus:ring-blue-500 focus:border-blue-500 ">
                      <option value={""} selected disabled>
                        Select...
                      </option>
                      {users.map((user, index) => (
                        <option value={index} key={index}>
                          {user.FirstName + " " + user.LastName}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      errors={errors}
                      name="client"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mt-3">Car</label>
                    <input
                      {...register("car", {
                        required: "Car is required"
                      })}
                      className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="car"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mt-3">VIN number</label>
                    <input
                      {...register("vin", {
                        required: "Vin is required"
                      })}
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="vin"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </div>
                  <div className="flex justify-center items-center mt-6 col-span-3">
                    <button
                      className="text-white bg-blue-500 active:bg-yellow-700 font-bold text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg hover:bg-blue-600 outline-none focus:outline-none mr-1 mb-1"
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
    </div>
  );
}

export default AddService;
