import React from 'react';
import './Styles.scss';
import { useState } from 'react';
import AuthContext from '../context/AuthProvider.tsx';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
const jwt = require('jsonwebtoken');

const Navbar = () => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const isAuth = auth

    const logout = () => {
      const token = localStorage.getItem('token');
      localStorage.clear();
      navigate('/')
    }

    return (
        <section className="navigation">
  <div className="nav-container">
    <div className="brand">
      <a href="/">🍀 AutoFix Solutions</a>
    </div>
    <nav>
  <div className="nav-mobile">
    <a id="nav-toggle" href="#!"><span></span></a>
  </div>
  <ul className="nav-list">
    <li><a href="#!">Home</a></li>
    <li><a href="#!">Shop</a></li>
    <li>
      <a href="#!">Services</a>
      <ul className="nav-dropdown">
        <li><a href="#!">Web Design</a></li>
        <li><a href="#!">Web Development</a></li>
        <li><a href="#!">Graphic Design</a></li>
      </ul>
    </li>
    <li><a href="#!">About Us</a></li>
    <li><a href="#!">Contact</a></li>
    {!isAuth &&
    <>
          <li><a href="/login">Sign in</a></li>
          <li><a href="/register">Sign up</a></li>
    </>
    }
    {isAuth &&
    <>
          <li><a href="/dashboard">Dashboard</a></li>
          <li onClick={logout}><a href="">Logout</a></li>
    </>
    }
  </ul>
</nav>
    </div>
</section>
    )
}

export default Navbar;