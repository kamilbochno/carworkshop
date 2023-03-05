import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import "./Styles.scss";
import DashboardNavigation from "../DashboardNavigation/DashboardNavigation.tsx";
import axios from "axios";
import CarsTable from "./CarsTable/CarsTable.tsx";
import AddCar from "./AddCar/AddCar.tsx";
import DeleteCar from "./DeleteCar/DeleteCar.tsx";
import EditCar from "./EditCar/EditCar.tsx";

function MyCars() {
  const [isOpenAddCar, setIsOpenAddCar] = useState(false);
  const [isOpenEditCar, setIsOpenEditCar] = useState(false);
  const [isOpenDeleteCar, setIsOpenDeleteCar] = useState(false);
  const [carDeleteId, setCarDeleteId] = useState();

  return (
    <div className="main">
      <DashboardNavigation></DashboardNavigation>
      <CarsTable
        setIsOpenAddCar={setIsOpenAddCar}
        setIsOpenEditCar={setIsOpenEditCar}
        setIsOpenDeleteCar={setIsOpenDeleteCar}
        setCarDeleteId={setCarDeleteId}></CarsTable>
      <AddCar openAddCar={isOpenAddCar} setIsOpenAddCar={setIsOpenAddCar} />
      <EditCar openEditCar={isOpenEditCar} setIsOpenEditCar={setIsOpenEditCar}></EditCar>
      <DeleteCar
        openDeleteCar={isOpenDeleteCar}
        setIsOpenDeleteCar={setIsOpenDeleteCar}
        carDeleteId={carDeleteId}></DeleteCar>
    </div>
  );
}

export default MyCars;
