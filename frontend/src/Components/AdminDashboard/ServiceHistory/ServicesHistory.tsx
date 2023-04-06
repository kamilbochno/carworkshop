import * as React from "react";
import * as ReactDOM from "react-dom";
import ServicesHistoryPaginated from "./ServicesTable/ServicesHistoryTable.tsx";
import AddService from "./AddService/AddService.tsx";
import ServiceDetails from "./ServiceDetails/ServiceDetails.tsx";
import DeleteService from "./DeleteService/DeleteService.tsx";

function ServicesHistory() {
  return (
    <div>
      <ServicesHistoryPaginated itemsPerPage={4} />
      <AddService />
      <ServiceDetails />
      <DeleteService />
    </div>
  );
}

export default ServicesHistory;
