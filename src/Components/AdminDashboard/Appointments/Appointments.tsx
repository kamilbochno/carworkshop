import * as React from "react";
import * as ReactDOM from "react-dom";
import AppointmentsTable from "./AppointmentsTable/AppointmentsTable.tsx";
import AppointmentDetails from "./AppointmentDetails/AppointmentDetails.tsx";
import EditAppointment from "./EditAppointment/EditAppointment.tsx";
import DeleteAppointment from "./DeleteAppointment/DeleteAppointment.tsx";

function Appointments() {
  return (
    <div>
      <AppointmentsTable />
      <AppointmentDetails />
      <EditAppointment />
      <DeleteAppointment />
    </div>
  );
}

export default Appointments;
