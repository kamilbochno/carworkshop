import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect, useContext, Fragment } from "react";
import { NavLink, Routes, Route, useParams } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import UserCarsContext from "../../context/userContext/UserCarsProvider.tsx";
import ReactPaginate from "react-paginate";
import AppointmentContext from "../../context/userContext/AppointmentProvider.tsx";

function Items({ currentItems }) {
  const { getUserAppointments } = useContext<any>(AppointmentContext);

  useEffect(() => {
    getUserAppointments();
  }, []);

  return (
    <div>
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 ">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
              Hours
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
              Car
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
              Status
            </th>
          </tr>
        </thead>
        <tbody id="carTable" className="divide-y divide-gray-200">
          {currentItems.map((appointment, index) => (
            <tr id={appointment._id} key={index}>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {appointment.date}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {appointment.hours}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {appointment.car}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {appointment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AppointmentsPaginated({ itemsPerPage }) {
  const { appointments } = useContext<any>(AppointmentContext);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = appointments.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(appointments.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % appointments.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto">
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

export default AppointmentsPaginated;
