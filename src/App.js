import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Navbar from './Components/Navbar/Navbar.tsx';
import Footer from './Components/Footer/Footer.tsx';
import logo from './logo.svg';
import { useState, useEffect } from 'react';
import {  Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage.tsx';
import RegisterPage from './Components/RegisterPage/RegisterPage.tsx';
import Home from "./Components/Home/Home.tsx";
import Dashboard from "./Components/Dashboard/Dashboard.tsx";
import Appointment from './Components/Appointment/Appointment.tsx';
import Cars from './Components/Cars/Cars.tsx';
import ProfileSettings from './Components/Profile/ProfileSettings/ProfileSettings.tsx';

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/dashboard/cars' element={<Cars />} />
      <Route path='/dashboard/appointment' element={<Appointment />} />
      <Route path='/dashboard/profile/settings' element={<ProfileSettings />} />
    </Routes>
  );
}

export default App;
