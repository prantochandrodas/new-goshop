import { Tabs } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import './NavManu.css';
const NavManu = () => {
    const { user } = useContext(AuthContext);
    const { data: getUser = [], isLoading, refetch } = useQuery({
        queryKey: ['getUser'],
        queryFn: () => fetch(` https://goshop-server-teal.vercel.app/getUser?email=${user?.email}`)
            .then(res => res.json())
    });
    return (
        <div className='NavManu' align="center">
            {
                user?.uid ?
                    <>
                        <NavLink style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: "500", fontSize: "15px" }} to='/'> Home</NavLink>
                        <NavLink style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: "500", fontSize: "15px" }} to='/AllProduct'> AllProducts</NavLink>
                        <NavLink style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: "500", fontSize: "15px" }} to='/MyOrders'> MyOrders</NavLink>
                        <NavLink style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: "500", fontSize: "15px" }} to='/WatchLater'> WatchLater</NavLink>
                    </> :
                    <></>
            }
            {
                getUser?.role === "Seller" ?
                    <> <NavLink style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: '500', fontSize: "15px" }} to='/dashboard/addProduct'>AddProductProduct</NavLink>
                        <NavLink style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: '500', fontSize: "15px" }} to='/dashboard/myproduct'>MyProduct</NavLink></> :
                    <></>
            }
            {
                getUser?.role === "admin" ?
                    <> <NavLink style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: '500', fontSize: "15px" }} to='/dashboard/manageUser'>manageUser</NavLink>
                        <NavLink style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: '500', fontSize: "15px" }} to='/dashboard/manageSeller'>manageSeller</NavLink></> :
                    <></>
            }
        </div>
    );
};

export default NavManu;