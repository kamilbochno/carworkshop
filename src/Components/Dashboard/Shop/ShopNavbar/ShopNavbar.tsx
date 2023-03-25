import * as React from "react";
import { Fragment, useState, useContext } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import ShopContext from "../../../context/userContext/ShopProvider.tsx";
import ShoppingCart from "../Cart/ShoppingCart.tsx";

export default function ShopNavbar() {
  const { userCartItems, itemsInCart, estimateTotalPrice, setIsOpenCart, setSubtotal } =
    useContext<any>(ShopContext);

  const openCart = () => {
    estimateTotalPrice();
    setIsOpenCart(true);
  };

  return (
    <div className="bg-white">
      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <div className="ml-auto flex items-center">
                <div className="lg:ml-8 lg:flex">
                  <button className="flex items-center text-gray-700 hover:text-gray-800">
                    <span className="ml-3 block text-sm font-medium">$</span>
                    <span className="ml-1 block text-sm font-medium">USD</span>
                    <span className="sr-only">, change currency</span>
                  </button>
                </div>
                <div className="ml-4 flow-root lg:ml-6">
                  <button onClick={() => openCart()} className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-8 w-8 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {itemsInCart}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <ShoppingCart />
      </header>
    </div>
  );
}
