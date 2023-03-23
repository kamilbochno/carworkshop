import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect, useContext, Fragment } from "react";
import { NavLink, Routes, Route, useParams } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import UserCarsContext from "../../context/userContext/UserCarsProvider.tsx";
import ReactPaginate from "react-paginate";

function Items({ currentItems }) {
  const { cars, getCars } = useContext<any>(UserCarsContext);

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div>
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 ">
              Brand
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
              Model
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
              Year
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
              VIN
            </th>
          </tr>
        </thead>

        <tbody id="carsTable" className="divide-y divide-gray-200">
          {currentItems.map((car, index) => (
            <tr id={car._id} key={index}>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{car.CarBrand}</td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{car.CarModel}</td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{car.Year}</td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{car.VinNumber}</td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
}

function CarsOverviewPaginated({ itemsPerPage }) {
  const { cars } = useContext<any>(UserCarsContext);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = cars.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cars.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % cars.length;
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

export default CarsOverviewPaginated;
