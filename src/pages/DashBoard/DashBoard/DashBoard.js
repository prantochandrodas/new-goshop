import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../Footer/Footer';
import DashBrardNavbar from '../DashBrardNavbar/DashBrardNavbar';

const DashBoard = () => {
    return (
        <div>
           <DashBrardNavbar></DashBrardNavbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default DashBoard;