import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import AdminDashboardNavigation from "../AdminDashboardNavigation/AdminDashboardNavigation.tsx";
import DashboardFooter from "../DashboardFooter/DashboardFooter.tsx";
import axios from "axios";
import EmployeesTable from "./EmployeesTable/EmployeesTable.tsx";
import AddEmployee from "./AddEmployee/AddEmployee.tsx";
import EditEmployee from "./EditEmployee/EditEmployee.tsx";
import DeleteEmployee from "./DeleteEmployee/DeleteEmployee.tsx";
import EmployeeDetails from "./EmployeeDetails/EmployeeDetails.tsx";
import Spinner from "../../InfoElements/Spinner.tsx";
import { Toaster } from "react-hot-toast";

function Employees() {
  return (
    <div>
      <Spinner />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000
        }}
      />
      <AdminDashboardNavigation />
      <EmployeesTable />
      <EmployeeDetails />
      <AddEmployee />
      <EditEmployee />
      <DeleteEmployee />
      <DashboardFooter />
    </div>
  );
}

export default Employees;
