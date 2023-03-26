import React from "react";
import { Fragment, useState, useEffect, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MinusIcon, PlusIcon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ShopContext from "../../../context/userContext/ShopProvider.tsx";
import axios from "axios";
import LoadingContext from "../../../context/LoadingProvider.tsx";
import toast from "react-hot-toast";

export default function ShoppingCart() {
  const { setIsLoading } = useContext<any>(LoadingContext);
  const {
    openCart,
    setIsOpenCart,
    subtotal,
    userCartItems,
    setUserCartItems,
    setItemsInCart,
    itemsInCart,
    setSubtotal,
    quantity,
    setQuantity,
    estimateTotalPrice
  } = useContext<any>(ShopContext);

  const removeItemFromCart = (index) => {
    const newItems = userCartItems.filter((item, i) => i !== index);
    const totalPrice = newItems
      .map((item) => {
        return Number(item.quantity) * Number(item.price);
      })
      .reduce((a, b) => a + b, 0);
    console.log(totalPrice);
    setUserCartItems(newItems);
    setSubtotal(totalPrice);
    setItemsInCart(itemsInCart - 1);
    toast.success("successfully removed item from cart!");
  };

  const decreaseQuantity = (index) => {
    let items = [...userCartItems];
    let item = { ...items[index] };
    if (item.quantity > 1) {
      item.quantity = item.quantity - 1;
      items[index] = item;
      setUserCartItems(items);
    }
  };

  const increaseQuantity = (index) => {
    let items = [...userCartItems];
    let item = { ...items[index] };
    if (item.quantity < item.totalQuantity) {
      item.quantity = item.quantity + 1;
      items[index] = item;
      setUserCartItems(items);
    }
  };

  const setCheckout = () => {
    const items = {
      items: userCartItems
    };
    setIsLoading(true);
    axios.post("/dashboard/shop/create-checkout-session", items).then((response) => {
      window.location = response.data;
      setIsLoading(false);
    });
  };

  return (
    <Transition.Root show={openCart} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsOpenCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full">
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-semibold text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setIsOpenCart(false)}>
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {userCartItems.length > 0 ? (
                            <ul className="-my-6 divide-y divide-gray-200">
                              {userCartItems.map((item, index) => (
                                <li key={index} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={item.src}
                                      alt={item.title}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col max-w-12">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{item.title}</h3>
                                        <p className="">
                                          ${(Number(item.quantity) * Number(item.price)).toFixed(2)}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="w-48">
                                        <div className="mx-auto">
                                          <button
                                            onClick={() => decreaseQuantity(index)}
                                            className="bg-blue-500 hover:bg-blue-600 h-6 w-6 rounded-full text-white">
                                            <MinusIcon className="w-6 h-6" />
                                          </button>
                                          <input
                                            defaultValue={item.quantity}
                                            value={item.quantity}
                                            name="quantity"
                                            className="shadow appearance-none border rounded w-12 h-6 text-black"
                                          />
                                          <button
                                            onClick={() => increaseQuantity(index)}
                                            className="bg-blue-500 hover:bg-blue-600 h-6 w-6 rounded-full text-white">
                                            <PlusIcon className="w-6 h-6" />
                                          </button>
                                        </div>
                                      </div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p className="text-gray-400 text-sm">${item.price}/Qty</p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">Qty {item.quantity}</p>

                                      <div className="flex">
                                        <button
                                          onClick={() => removeItemFromCart(index)}
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500">
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="mx-auto text-center mt-48 text-gray-400">
                              The cart is empty
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${subtotal.toFixed(2)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <button
                          onClick={() => setCheckout()}
                          disabled={userCartItems.length === 0}
                          className="flex items-center w-full justify-center rounded-md border border-transparent bg-blue-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-600">
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="ml-2 font-medium text-blue-500 hover:text-blue-600"
                            onClick={() => setIsOpenCart(false)}>
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
