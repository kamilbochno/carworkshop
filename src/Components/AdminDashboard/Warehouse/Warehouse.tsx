import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect, useContext } from "react";
import { NavLink, Routes, Route, useParams } from "react-router-dom";
import { Container } from "@mui/system";
import routes from "../routes/menu.tsx";
import { Box } from "@mui/material";
import Tabs from "@mui/material";
import Tab from "@mui/material";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import DashboardNavigation from "../AdminDashboardNavigation/AdminDashboardNavigation.tsx";
import DashboardFooter from "../DashboardFooter/DashboardFooter.tsx";
import WarehouseContext from "../../context/adminContext/WarehouseProvider.tsx";
import AddCarRepairShopItem from "./CarRepairShopItems/AddCarRepairShopItem/AddCarRepairShopItem.tsx";
import AddCarShopItem from "./CarShopItems/AddCarShopItem/AddCarShopItem.tsx";
import CarRepairShopItemsPaginated from "./CarRepairShopItems/CarRepairShopItems.tsx";
import CarShopItemsPaginated from "./CarShopItems/CarShopItems.tsx";
import CarRepairShopItemDetails from "./CarRepairShopItems/CarRepairShopItemDetails/carRepairShopItemDetails.tsx";
import EditCarRepairShopItem from "./CarRepairShopItems/EditCarRepairShopItem/EditCarRepairShopItem.tsx";
import DeleteCarRepairShopItem from "./CarRepairShopItems/DeleteCarRepairShopItem/DeleteCarRepairShopItem.tsx";
import CarShopItemDetails from "./CarShopItems/CarShopItemDetails/carShopItemDetails.tsx";
import DeleteCarShopItem from "./CarShopItems/DeleteCarShopItem/DeleteCarShopItem.tsx";
import EditCarShopItem from "./CarShopItems/EditCarShopItem/EditCarShopItem.tsx";
import Spinner from "../../InfoElements/Spinner.tsx";
import { Toaster } from "react-hot-toast";

function Warehouse() {
  const {
    getCarRepairShopItems,
    getCarShopItems,
    setIsOpenAddCarShopItem,
    setIsOpenAddCarRepairShopItem,
    itemCategory,
    handleSelectCarRepairItemsCategory,
    handleSelectCarItemsCategory
  } = useContext<any>(WarehouseContext);
  const [carRepairShopItemsPages, setcarRepairShopItemsPages] = useState(10);
  const [carShopItemsPages, setcarShopItemsPages] = useState(10);

  useEffect(() => {
    getCarRepairShopItems();
    getCarShopItems();
  }, []);

  function setCarRepairShopProducts(e) {
    e.preventDefault();
    console.log(e.target.value);
    setcarRepairShopItemsPages(e.target.value);
  }

  function setCarShopProducts(e) {
    e.preventDefault();
    console.log(e.target.value);
    setcarShopItemsPages(e.target.value);
  }

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
      <div className="bg-gray-100 mx-auto py-6">
        <div className="mx-auto grid grid-cols-4 max-w-7xl py-6 px-4 sm:px-6 lg:px-8 border-b-2 border-gray-300">
          <h1 className="pt-4 text-3xl font-bold tracking-tight text-gray-900">Warehouse</h1>
          <div className="col-span-3"></div>
        </div>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8">
            <div className="bg-white rounded-lg border-2 border-solid border-gray-300">
              <div className="mt-4 text-2xl tracking-tight text-black font-semibold text-center">
                Car repair shop items
              </div>
              <div className="pb-4 pt-4 mx-auto max-w-xl">
                <div className="grid grid-cols-2">
                  <div className="text-left ml-4">
                    <div className="text-xs text-gray-500 uppercase">Products category</div>
                    <select
                      name="itemsCategory"
                      onChange={handleSelectCarRepairItemsCategory}
                      className="border-2 border-gray-400 rounded-lg mr-6 w-32 ">
                      <option value={""} selected>
                        All
                      </option>
                      {itemCategory.map((item) => (
                        <option value={item.category} key={item.category}>
                          {item.category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-right mr-4">
                    <div className="text-xs text-gray-500 uppercase">Products per page</div>
                    <select
                      onChange={setCarRepairShopProducts}
                      className="border-2 border-gray-400 rounded-lg w-16 text-center">
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="60">60</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="text-center mt-8 pb-2">
                <button
                  onClick={() => setIsOpenAddCarRepairShopItem(true)}
                  className="bg-blue-500 hover:bg-blue-600 mb-2 h-8 w-28 rounded-full text-white">
                  Add item
                </button>
              </div>
              <AddCarRepairShopItem />
              <CarRepairShopItemDetails />
              <EditCarRepairShopItem />
              <DeleteCarRepairShopItem />
              <CarRepairShopItemsPaginated itemsPerPage={carRepairShopItemsPages} />
            </div>
            <div className="bg-white rounded-lg border-2 border-solid border-gray-300">
              <div className="mt-4 text-2xl tracking-tight text-black font-semibold text-center">
                Car shop items
              </div>
              <div className="pb-4 pt-4 mx-auto max-w-xl">
                <div className="grid grid-cols-2">
                  <div className="text-left ml-4">
                    <div className="text-xs text-gray-500 uppercase">Products category</div>
                    <select
                      onChange={handleSelectCarItemsCategory}
                      name="itemsCategory"
                      className="border-2 border-gray-400 rounded-lg mr-6 w-32 ">
                      <option value={""} selected>
                        All
                      </option>
                      {itemCategory.map((item) => (
                        <option value={item.category} key={item.category}>
                          {item.category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-right mr-4">
                    <div className="text-xs text-gray-500 uppercase">Products per page</div>
                    <select
                      onChange={setCarShopProducts}
                      className="border-2 border-gray-400 rounded-lg w-16 text-center">
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="60">60</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="text-center mt-8 pb-2">
                <button
                  onClick={() => setIsOpenAddCarShopItem(true)}
                  className="bg-blue-500 hover:bg-blue-600 mb-2 h-8 w-28 rounded-full text-white">
                  Add item
                </button>
              </div>
              <AddCarShopItem />
              <CarShopItemDetails />
              <EditCarShopItem />
              <DeleteCarShopItem />
              <CarShopItemsPaginated itemsPerPage={carShopItemsPages} />
            </div>
          </div>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default Warehouse;
