import * as React from "react";
import * as ReactDOM from "react-dom";
import ServicesHistoryPaginated from "./ServicesTable/ServicesHistoryTable.tsx";
import AddService from "./AddService/AddService.tsx";
import ServiceDetails from "./ServiceDetails/ServiceDetails.tsx";
import EditService from "./EditService/EditService.tsx";
import DeleteService from "./DeleteService/DeleteService.tsx";

function ServicesHistory() {
  return (
    <div>
      <ServicesHistoryPaginated itemsPerPage={5} />
      <AddService />
      <ServiceDetails />
      <EditService />
      <DeleteService />
    </div>
  );
}

export default ServicesHistory;
