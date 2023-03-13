import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import EmployeesContext from "../../../context/adminContext/EmployeesProvider.tsx";

function EditCar() {
  const { isOpenEditEmployee, setIsOpenEditEmployee, employee, employeeRole, getEmployees } =
    useContext<any>(EmployeesContext);

  const handleSubmitEditEmployee = async (e) => {
    e.preventDefault();
    const employeeData = {
      name: e.target.name.value,
      surName: e.target.surName.value,
      phone: e.target.phone.value,
      city: e.target.city.value,
      email: e.target.email.value,
      stateProvince: e.target.stateProvince.value,
      street: e.target.street.value,
      zipPostal: e.target.zipPostal.value,
      role: e.target.role.value,
      salary: e.target.salary.value,
      employeeId: employee._id
    };
    if (
      employeeData.name &&
      employeeData.surName &&
      employeeData.phone &&
      employeeData.city &&
      employeeData.email &&
      employeeData.stateProvince &&
      employeeData.street &&
      employeeData.zipPostal &&
      employeeData.role &&
      employeeData.salary
    ) {
      try {
        const employee = await axios
          .post("/dashboard/admin/employees/edit", employeeData)
          .then((res) => {
            if (res.status === 201) {
              setIsOpenEditEmployee(false);
              getEmployees();
            }
          });
      } catch (err) {
        if (err.response.status === 400) {
          console.log(err.response.data);
        }
      }
    }
  };
  if (!isOpenEditEmployee) return null;

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-center justify-between p-6 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font=semibold mx-auto">Edit employee</h3>
            <button
              type="button"
              onClick={() => setIsOpenEditEmployee(false)}
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
            <form className="px-8 w-full" onSubmit={handleSubmitEditEmployee}>
              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <label className="block text-sm font-medium text-black mt-3">Name</label>
                  <input
                    name="name"
                    defaultValue={employee.Name}
                    className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                  />
                  <label className="block text-sm font-medium text-black mt-3">Surname</label>
                  <input
                    name="surName"
                    defaultValue={employee.Surname}
                    className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                  />
                  <label className="block text-sm font-medium text-black mt-3">Phone</label>
                  <input
                    name="phone"
                    defaultValue={employee.Phone}
                    className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                  />
                  <label className="block text-sm font-medium text-black mt-3">City</label>
                  <input
                    name="city"
                    defaultValue={employee.City}
                    className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                  />
                  <label className="block text-sm font-medium text-black mt-3">Email</label>
                  <input
                    name="email"
                    defaultValue={employee.Email}
                    className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mt-3">
                    State / Province
                  </label>
                  <input
                    name="stateProvince"
                    defaultValue={employee.StateProvince}
                    className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                  />
                  <label className="block text-sm font-medium text-black mt-3">Street</label>
                  <input
                    name="street"
                    defaultValue={employee.Street}
                    className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                  />
                  <label className="block text-sm font-medium text-black mt-3">Zip / Postal</label>
                  <input
                    name="zipPostal"
                    defaultValue={employee.ZipPostal}
                    className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                  />
                  <label className="block text-sm font-medium text-black mt-3">Role</label>
                  <select
                    name="role"
                    defaultValue={employee.Role}
                    className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black focus:ring-blue-500 focus:border-blue-500 ">
                    <option value={""} selected disabled>
                      Select...
                    </option>
                    {employeeRole.map((role) => (
                      <option value={role.title} key={role.title}>
                        {role.title}
                      </option>
                    ))}
                  </select>
                  <label className="block text-sm font-medium text-black mt-3">Salary</label>
                  <input
                    name="salary"
                    defaultValue={employee.Salary}
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  />
                </div>
                <div className="flex justify-center items-center mt-6 col-span-2">
                  <button
                    className="text-white bg-blue-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg hover:bg-blue-600 outline-none focus:outline-none mr-1 mb-1"
                    type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCar;
