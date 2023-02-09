import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Navbar from '../Navbar/Navbar.tsx';
import Footer from '../Footer/Footer.tsx';
import logo from './logo.svg';
import { useState, useEffect } from 'react';
import {  Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
        <Navbar/>
        <Footer/>
    </div>
    
  );
}

export default App;
