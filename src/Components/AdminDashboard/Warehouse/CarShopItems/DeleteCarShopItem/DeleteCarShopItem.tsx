import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import WarehouseContext from "../../../../context/adminContext/WarehouseProvider.tsx";

function DeleteCarShopItem() {
  const { isOpenCarShopItemDelete, setIsOpenCarShopItemDelete, carShopItem, getCarShopItems } =
    useContext<any>(WarehouseContext);

  const DeleteCarShopItem = () => {
    const itemId = { itemId: carShopItem._id, key: carShopItem.key };
    axios.post("/dashboard/admin/warehouse/carshopitems/delete", itemId).then((response) => {
      setIsOpenCarShopItemDelete(false);
      getCarShopItems();
    });
  };

  if (!isOpenCarShopItemDelete) {
    return null;
  }

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl border-2 border-gray-200">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <button
            type="button"
            onClick={() => setIsOpenCarShopItemDelete(false)}
            className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
          <div className="relative p-4">
            <div className="px-8-full">
              <p className="block mb-8 text-sm font-medium text-lg text-black text-center max-w-lg">
                <p className="text-black font-semibold text-center">Are you sure to delete</p>"
                {carShopItem.title}"?
              </p>
              <div className="text-center">
                <button
                  onClick={() => DeleteCarShopItem()}
                  className="text-white bg-red-600 hover:bg-red-700 active:bg-gray-400 font-bold uppercase text-sm px-6 py-3 border-2 border-gray-500 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1">
                  Yes, i'm sure
                </button>
                <button
                  className="text-black bg-transparent hover:bg-gray-200 active:bg-gray-400 font-bold uppercase text-sm px-6 py-3 border-2 border-gray-500 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  onClick={() => setIsOpenCarShopItemDelete(false)}
                  type="button">
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteCarShopItem;
