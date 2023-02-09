import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Footer from '../Footer/Footer.tsx';
import logo from './logo.svg';
import { useState, useEffect } from 'react';
import {  NavLink, Routes, Route, useParams } from 'react-router-dom';
import { Container } from '@mui/system';
import './Styles.scss';
import routes from '../routes/menu.tsx';
import { Box } from '@mui/material';
import Tabs from '@mui/material';
import Tab from '@mui/material';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import DashboardNavigation from '../DashboardNavigation/DashboardNavigation.tsx';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

function Appointment() {

  const [value, onChange] = useState(new Date());
  const [cars, setCars] = useState <any>([]);
  const getCars = () => {
    const token = {token: localStorage.getItem('token')}
    axios.post("/dashboard/cars", token).then((response) => {
      setCars(response.data);
      console.log(token)
    })
  }

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div className="main">
      <DashboardNavigation></DashboardNavigation>
      <div className="flex items-center flex-row w-3/4 overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table className="table-auto">
        <thead>
          <tr>
            <th>Car brand</th>
            <th>Car model</th>
          </tr>
        </thead>
        <tbody>
        {cars.map(car => (
            <tr key={car._id}>
              <td>{car.CarBrand}</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
</div>
    </div>
    
  );
}

export default Appointment;
