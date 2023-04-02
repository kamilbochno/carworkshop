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

function AddService() {
  const { isOpenAddPartService, setIsOpenAddPartService, setServiceParts, serviceParts } =
    useContext<any>(AdminServicesHistoryContext);

  const { getCarRepairShopItems, carRepairShopItems, carRepairShopItem } =
    useContext<any>(WarehouseContext);

  interface IFormInput {
    part: any;
    quantity: String;
    servicePart: Object;
  }

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IFormInput>({ criteriaMode: "all" });

  useEffect(() => {
    getCarRepairShopItems();
  }, []);

  const handleSubmitPart: SubmitHandler<IFormInput> = (data) => {
    data.servicePart = { quantity: data.quantity, part: carRepairShopItems[data.part] };
    setServiceParts([...serviceParts, data.servicePart]);
    setIsOpenAddPartService(false);
  };
  if (!isOpenAddPartService) return null;

  return (
    <div className="fixed top-0 left-0 backdrop-brightness-50 z-10 h-full w-full">
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-between p-6 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold mx-auto">Add part to service</h3>
              <button
                type="button"
                onClick={() => setIsOpenAddPartService(false)}
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
            <div className="relative p-4 max-w-sm">
              <form className="" onSubmit={handleSubmit(handleSubmitPart)}>
                <div className="">
                  <div>
                    <label className="block text-sm font-medium text-black mt-3">Part</label>
                  </div>
                  <div>
                    <select
                      {...register("part", {
                        required: "Part is required"
                      })}
                      className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black focus:ring-blue-500 focus:border-blue-500 ">
                      <option value={""} selected disabled>
                        Select...
                      </option>
                      {carRepairShopItems.map((item, index) => (
                        <option value={index} key={index}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      errors={errors}
                      name="price"
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
                    <label className="block text-sm font-medium text-black mt-3">Quantity</label>
                  </div>
                  <div>
                    <input
                      {...register("quantity", {
                        required: "Quantity is required"
                      })}
                      className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="quantity"
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
                  <div className="flex justify-center items-center mt-6 col-span-2">
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
