import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect, useContext, Fragment } from "react";
import { NavLink, Routes, Route, useParams } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import OrderHistoryContext from "../../context/userContext/OrderHistoryProvider.tsx";
import ReactPaginate from "react-paginate";

function Items({ currentItems }) {
  const {
    setIsOpenDetailsPurchase,
    setPurchase,
    purchases,
    getRecentPurchases,
    setIsOpenEditPurchase
  } = useContext<any>(OrderHistoryContext);

  useEffect(() => {
    getRecentPurchases();
  }, []);

  function purchaseDetails(purchaseInfo) {
    setPurchase(purchaseInfo);
    setIsOpenDetailsPurchase(true);
  }

  function purchaseEdit(purchaseInfo) {
    setPurchase(purchaseInfo);
    setIsOpenEditPurchase(true);
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="mt-4">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 ">
              Order
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 ">
              Customer
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
              Modified
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody id="recentPurchasesTable" className="divide-y divide-gray-200">
          {currentItems.map((purchase, index) => (
            <tr id={purchase._id} key={index}>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {purchase._id.slice(0, 6)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {purchase.totalPrice}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {purchase.created}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                ${purchase.totalPrice}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {purchase.status}
              </td>
              <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 uppercase font-semibold text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                      </svg>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => purchaseDetails(purchases[index])}
                              className={classNames(
                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                "block px-4 py-2 text-sm w-24"
                              )}>
                              Details
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => purchaseEdit(purchases[index])}
                              className={classNames(
                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                "block px-4 py-2 text-sm w-24"
                              )}>
                              Edit
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
}

function RecentPurchasesPaginated({ itemsPerPage }) {
  const { purchases } = useContext<any>(OrderHistoryContext);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = purchases.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(purchases.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % purchases.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="mx-auto">
        <Items currentItems={currentItems} />
      </div>
      <div className="mx-auto text-center mt-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageClassName="ml-2 mr-2 text-center text-xl font-semibold"
          previousClassName="text-center text-2xl text-blue-600 font-semibold"
          nextClassName="text-center text-2xl text-blue-600 font-semibold"
          containerClassName="inline-flex "
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}

export default RecentPurchasesPaginated;
