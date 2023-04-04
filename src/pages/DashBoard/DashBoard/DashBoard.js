import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../Footer/Footer';
import DashBrardNavbar from '../DashBrardNavbar/DashBrardNavbar';
import Navbar from '../../Navbar/Navbar';

const DashBoard = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default DashBoard;