import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect, useContext, Fragment } from "react";
import { NavLink, Routes, Route, useParams } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import EmployeesContext from "../../../context/adminContext/EmployeesProvider.tsx";

function EmployeesTable() {
  const {
    isOpenAddEmployee,
    setIsOpenAddEmployee,
    isOpenEditEmployee,
    isOpenDetailsEmployee,
    setIsOpenDetailsEmployee,
    setIsOpenEditEmployee,
    isOpenDeleteEmployee,
    setIsOpenDeleteEmployee,
    setEmployee,
    employees,
    getEmployees
  } = useContext<any>(EmployeesContext);

  useEffect(() => {
    getEmployees();
  }, []);

  function employeeDetails(employeeInfo) {
    setEmployee(employeeInfo);
    setIsOpenDetailsEmployee(true);
  }

  function editEmployee(employeeInfo) {
    setEmployee(employeeInfo);
    setIsOpenEditEmployee(true);
  }

  function deleteEmployee(employeeInfo) {
    setEmployee(employeeInfo);
    setIsOpenDeleteEmployee(true);
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <main>
      <div className="bg-gray-100 h-screen mx-auto py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 border-b-2 border-gray-300">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Employees</h1>
        </div>
        <div className="mt-8 mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setIsOpenAddEmployee(true)}
            className="bg-blue-500 hover:bg-blue-600 h-10 w-28 rounded-lg text-white mb-4 text-sm font-semibold ">
            Add employee
          </button>
          <div className="bg-white rounded-lg border-2 border-solid border-gray-300">
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

              <tbody id="carTable" className="divide-y divide-gray-200">
                {employees.map((employee, index) => (
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
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
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
                                    onClick={() => employeeDetails(employees[index])}
                                    className={classNames(
                                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                      "block px-4 py-2 text-sm w-24"
                                    )}>
                                    Details
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => editEmployee(employees[index])}
                                    className={classNames(
                                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                      "block px-4 py-2 text-sm w-24"
                                    )}>
                                    Edit
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => deleteEmployee(employees[index])}
                                    className={classNames(
                                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                      "block px-4 py-2 text-sm w-24 text-red-500 hover:text-red-700"
                                    )}>
                                    Delete
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
        </div>
      </div>
    </main>
  );
}

export default EmployeesTable;
