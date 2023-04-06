import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect, useContext } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import EmployeesContext from "../../../context/adminContext/EmployeesProvider.tsx";
import { toast } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function AddEmployee() {
  const {
    isOpenAddEmployee,
    setIsOpenAddEmployee,
    employee,
    setEmployee,
    employees,
    setEmployees,
    getEmployees,
    employeeRole
  } = useContext<any>(EmployeesContext);

  interface IFormInput {
    name: String;
    surname: String;
    phone: Number;
    city: String;
    email: String;
    stateProvince: String;
    street: String;
    zipPostal: String;
    role: String;
    salary: Number;
  }
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IFormInput>({ criteriaMode: "all" });

  const handleSubmitEmployee: SubmitHandler<IFormInput> = async (data) => {
    try {
      await axios.post("/dashboard/admin/employees/add", data).then((res) => {
        if (res.status === 201) {
          setIsOpenAddEmployee(false);
          getEmployees();
          toast.success(res.data);
        }
      });
    } catch (err) {
      if (err.response.status === 400) {
        toast.error(err.response.data);
      }
    }
  };

  if (!isOpenAddEmployee) return null;

  return (
    <div className="fixed top-0 left-0 backdrop-brightness-50 backdrop-blur-sm z-0 h-full w-full">
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-between p-6 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold mx-auto">Add new employee</h3>
              <button
                type="button"
                onClick={() => setIsOpenAddEmployee(false)}
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
              <form className="px-8 w-full" onSubmit={handleSubmit(handleSubmitEmployee)}>
                <div className="grid grid-cols-2 gap-x-4">
                  <div>
                    <label className="block text-sm font-medium text-black mt-3">Name</label>
                    <input
                      type="text"
                      {...register("name", {
                        required: "Name is required",
                        pattern: {
                          value: /^[a-z ,.'-]+$/i,
                          message: "Wrong Name format"
                        }
                      })}
                      className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="name"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                    <label className="block text-sm font-medium text-black mt-3">Surname</label>
                    <input
                      {...register("surname", {
                        required: "Surname is required",
                        pattern: {
                          value: /^[a-z ,.'-]+$/i,
                          message: "Wrong Surname format"
                        }
                      })}
                      className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="surname"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                    <label className="block text-sm font-medium text-black mt-3">Phone</label>
                    <input
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "This input is number only"
                        }
                      })}
                      className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="phone"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                    <label className="block text-sm font-medium text-black mt-3">City</label>
                    <input
                      {...register("city", {
                        required: "City is required",
                        pattern: {
                          value: /^[a-zA-Z]+$/,
                          message: "This input is letters only"
                        }
                      })}
                      className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="city"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                    <label className="block text-sm font-medium text-black mt-3">Email</label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                          message: "Wrong email format"
                        }
                      })}
                      className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="email"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mt-3">
                      State / Province
                    </label>
                    <input
                      {...register("stateProvince", {
                        required: "State/Province is required",
                        pattern: {
                          value: /^[a-zA-Z]+$/,
                          message: "This input is letters only"
                        }
                      })}
                      className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="stateProvince"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                    <label className="block text-sm font-medium text-black mt-3">Street</label>
                    <input
                      {...register("street", {
                        required: "Street is required",
                        pattern: {
                          value: /^[a-zA-Z]+$/,
                          message: "This input is letters only"
                        }
                      })}
                      className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="street"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                    <label className="block text-sm font-medium text-black mt-3">
                      Zip / Postal
                    </label>
                    <input
                      {...register("zipPostal", {
                        required: "Zip/Postal is required",
                        pattern: {
                          value: /^\d{5}(?:[-\s]\d{4})?$/,
                          message: "Wrong us postal code format"
                        }
                      })}
                      className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="zipPostal"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                    <label className="block text-sm font-medium text-black mt-3">Role</label>
                    <select
                      {...register("role", { required: "Role is required" })}
                      id="role"
                      className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black focus:ring-blue-500 focus:border-blue-500 ">
                      <option value={""} selected disabled>
                        Select...
                      </option>
                      {employeeRole.map((role) => (
                        <option key={role.title}>{role.title}</option>
                      ))}
                    </select>
                    <ErrorMessage
                      errors={errors}
                      name="role"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mb-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                    <label className="block text-sm font-medium text-black mt-3">Salary</label>
                    <input
                      {...register("salary", { required: "Salary is required" })}
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="salary"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-sm text-red-500 mt-2" key={type}>
                            {message}
                          </p>
                        ))
                      }
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
    </div>
  );
}

export default AddEmployee;
