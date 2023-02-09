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

function Dashboard() {
  return (
    <div className="main">
      <DashboardNavigation></DashboardNavigation>
      <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900"></h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
              <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
            </div>
            {/* /End replace */}
          </div>
        </main>
    </div>
    
  );
}

export default Dashboard;
