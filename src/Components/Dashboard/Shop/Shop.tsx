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
import DashboardNavigation from "../DashboardNavigation/DashboardNavigation.tsx";
import DashboardFooter from "../DashboardFooter/DashboardFooter.tsx";
import ShopNavbar from "./ShopNavbar/ShopNavbar.tsx";
import ShopContext from "../../context/userContext/ShopProvider.tsx";
import CarShopItemsPaginated from "./CarShopItems/CarShopItems.tsx";
import CarShopItemDetails from "./CarShopItems/CarShopItemDetails/CarShopItemDetails.tsx";
import Spinner from "../../InfoElements/Spinner.tsx";

function Shop() {
  const {
    carShopItems,
    getCarShopItems,
    carShopItemsCategory,
    itemCategory,
    handleSelectCarShopItemsCategory,
    userCartItems,
    setUserCartItems,
    setItemsInCart,
    estimateTotalPrice
  } = useContext<any>(ShopContext);
  const [pages, setPages] = useState(10);
  useEffect(() => {
    getCarShopItems();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(userCartItems));
    estimateTotalPrice();
  }, [userCartItems]);

  useEffect(() => {
    let localCart = JSON.parse(localStorage.getItem("cart")!);
    if (localCart.length > 0) {
      const time = localCart[localCart.length - 1].timeWhenAdded;
      const expirationTime = time + 10000;
      if (Date.now() > expirationTime) {
        localStorage.setItem("cart", JSON.stringify([]));
      } else {
        setUserCartItems(localCart);
        setItemsInCart(localCart.length);
      }
    }
  }, []);

  function setCarShopProducts(e) {
    e.preventDefault();
    setPages(e.target.value);
  }

  return (
    <div className="main">
      <DashboardNavigation />
      <div className="bg-gray-100 mx-auto py-6">
        <div className="mx-auto grid grid-cols-4 max-w-7xl py-6 px-4 sm:px-6 lg:px-8 border-b-2 border-gray-300">
          <h1 className="pt-4 text-3xl font-bold tracking-tight text-gray-900">Shop</h1>
          <div className="col-span-3">
            <ShopNavbar />
          </div>
        </div>
        <Spinner />
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-x-8 gap-y-8">
            <div className="bg-white h-100 rounded-lg border-2 border-solid border-gray-300">
              <div className="mt-4 text-2xl tracking-tight text-black font-semibold text-center">
                Filters
              </div>
              <div className="text-center mt-6">
                <div className="text-lg text-gray-500">Products category</div>
                <select
                  onChange={handleSelectCarShopItemsCategory}
                  name="itemsCategory"
                  className="border-2 border-gray-400 rounded-lg  w-38 ">
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
            </div>
            <div className="bg-white col-span-3 rounded-lg border-2 border-solid border-gray-300">
              <div className="mt-4 text-2xl tracking-tight text-black font-semibold text-center">
                Products
              </div>
              <div className="mt-4 text-xl tracking-tight text-gray-500 text-center">
                {carShopItemsCategory}
              </div>
              <div className="pb-4 mx-auto max-w-xl">
                <div className="">
                  <div className="text-right">
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
              <CarShopItemsPaginated itemsPerPage={pages} />
              <CarShopItemDetails />
            </div>
          </div>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default Shop;
