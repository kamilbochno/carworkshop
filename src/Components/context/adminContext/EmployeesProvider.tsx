import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const EmployeesContext = createContext({});

export const EmployeesProvider = ({ children }) => {
  const [isOpenAddEmployee, setIsOpenAddEmployee] = useState(false);
  const [isOpenEditEmployee, setIsOpenEditEmployee] = useState(false);
  const [isOpenDeleteEmployee, setIsOpenDeleteEmployee] = useState(false);
  const [isOpenDetailsEmployee, setIsOpenDetailsEmployee] = useState(false);

  const employeeRole = [
    {
      title: "Mechanic"
    },
    {
      title: "Seller"
    },
    {
      title: "Office worker"
    }
  ];
  const [employee, setEmployee] = useState();
  const [employees, setEmployees] = useState<any>([]);

  const getEmployees = () => {
    axios.get("/dashboard/admin/employees").then((response) => {
      let employeesData = response.data;
      setEmployees(employeesData);
    });
  };

  return (
    <EmployeesContext.Provider
      value={{
        isOpenAddEmployee,
        setIsOpenAddEmployee,
        isOpenEditEmployee,
        setIsOpenEditEmployee,
        isOpenDeleteEmployee,
        setIsOpenDeleteEmployee,
        isOpenDetailsEmployee,
        setIsOpenDetailsEmployee,
        employee,
        setEmployee,
        employees,
        setEmployees,
        getEmployees,
        employeeRole
      }}>
      {children}
    </EmployeesContext.Provider>
  );
};

export default EmployeesContext;
