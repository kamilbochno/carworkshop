import React, { useEffect, useState, useContext, Fragment } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import EmployeesContext from "../../context/adminContext/EmployeesProvider.tsx";
import { Menu, Transition } from "@headlessui/react";

function Items({ currentItems }) {
  const { getEmployees, employees } = useContext<any>(EmployeesContext);

  return (
    <>
      <div className="bg-white rounded-lg mt-16">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 ">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
                Surname
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
                Phone
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "></th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "></th>
            </tr>
          </thead>

          <tbody id="employeesTable" className="divide-y divide-gray-200">
            {currentItems.map((employee, index) => (
              <tr id={employee._id} key={index}>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {employee.Name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {employee.Surname}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {employee.Phone}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {employee.Role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function EmployeesPaginated({ itemsPerPage }) {
  const { getEmployees, employees } = useContext<any>(EmployeesContext);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = employees.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(employees.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % employees.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="max-w-5xl mb-12 gap-x-6 gap-y-8 mx-auto">
        <Items currentItems={currentItems} />
      </div>
      <div className="mx-auto text-center">
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

export default EmployeesPaginated;
