import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import DashboardNavigation from "../DashboardNavigation/DashboardNavigation.tsx";
import DashboardFooter from "../DashboardFooter/DashboardFooter.tsx";
import axios from "axios";
import CarsTable from "./CarsTable/CarsTable.tsx";
import AddCar from "./AddCar/AddCar.tsx";
import DeleteCar from "./DeleteCar/DeleteCar.tsx";
import EditCar from "./EditCar/EditCar.tsx";
import Spinner from "../../InfoElements/Spinner.tsx";
import { Toaster } from "react-hot-toast";

function MyCars() {
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
      <DashboardNavigation />
      <CarsTable></CarsTable>
      <AddCar />
      <EditCar></EditCar>
      <DeleteCar></DeleteCar>
      <DashboardFooter />
    </div>
  );
}

export default MyCars;
