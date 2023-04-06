import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import OrderHistoryContext from "../../context/userContext/OrderHistoryProvider.tsx";
import OrderItemsPaginated from "./OrderHistoryDetailsTable.tsx";
import LoadingContext from "../../context/LoadingProvider.tsx";

function AppointmentDetails() {
  const { isOpenDetailsOrder, setIsOpenDetailsOrder, order } = useContext<any>(OrderHistoryContext);
  const { setIsLoading } = useContext<any>(LoadingContext);

  const setPayment = async () => {
    let items = {
      items: order.items.items,
      orderId: "",
      totalPrice: order.totalPrice
    };
    let orderId = "";
    setIsLoading(true);
    orderId = order._id;
    items = { ...items, orderId: orderId, totalPrice: order.totalPrice };
    await axios.post("/dashboard/shop/create-checkout-session", items).then((response) => {
      window.location = response.data;
      setIsLoading(false);
    });
  };

  if (!isOpenDetailsOrder) return null;

  return (
    <div className="fixed top-0 left-0 backdrop-brightness-50 backdrop-blur-sm z-10 h-full w-full">
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-between p-6 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold mx-auto">Order details</h3>
              <button
                type="button"
                onClick={() => setIsOpenDetailsOrder(false)}
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
              <OrderItemsPaginated itemsPerPage={2} />
            </div>
            <div className="grid grid-cols-2 mb-4">
              <div>
                <h3 className="text-xl font=semibold text-center">Order status</h3>
                {order.status === "Payment failed" ? (
                  <div className="text-center">
                    <p className="text-sm text-red-500">{order.status}</p>
                    <button
                      onClick={() => setPayment()}
                      className="w-24 h-8 mt-2 mb-4 flex mx-auto bg-blue-500 rounded-lg hover:bg-blue-600 tracking-tight">
                      <p className="text-white mx-auto mt-1">Pay now</p>
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-center">{order.status}</p>
                )}
              </div>
              <div>
                <h3 className="text-xl font=semibold text-center">Order total price</h3>
                <p className="text-lg text-blue-500 text-center">${order.totalPrice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetails;
