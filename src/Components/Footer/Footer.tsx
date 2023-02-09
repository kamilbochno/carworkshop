import React from 'react';
import './Styles.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
const Footer = () => {
    const navigate = useNavigate();
 
    function click() {

    }
    return (
    <section className="footer">
        <div className="footer-container">
    <div className="footer-brand">
      <a href="/">🍀 AutoFix Solutions</a>
    </div>
    <footer>
        <div>
        </div>
</footer>
    </div>
</section>
    )
}

export default Footer;