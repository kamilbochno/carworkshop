import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect, useContext, Fragment } from "react";
import { NavLink, Routes, Route, useParams } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import ServicesHistoryContext from "../../../context/adminContext/ServicesHistoryProvider.tsx";
import ReactPaginate from "react-paginate";

function Items({ currentItems }) {
  const { serviceParts, setServiceParts } = useContext<any>(ServicesHistoryContext);

  useEffect(() => {}, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div>
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 ">
              Item
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
              Title
            </th>
          </tr>
        </thead>

        <tbody id="purchaseHistoryTable" className="divide-y divide-gray-200">
          {currentItems.map((item, index) => (
            <tr id={item._id} key={index}>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                <img className="h-12" alt={item.part.src} src={item.part.src}></img>
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{item.quantity}</td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                ${item.part.price}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {item.part.title}
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
}

function ServicePartsPaginated({ itemsPerPage }) {
  const { serviceParts, setServiceParts } = useContext<any>(ServicesHistoryContext);
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = serviceParts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(serviceParts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % serviceParts.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="overflow-x-auto overflow-y-hidden max-w-5xl mx-auto">
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

export default ServicePartsPaginated;
