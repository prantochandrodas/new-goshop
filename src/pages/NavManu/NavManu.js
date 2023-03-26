import { Tabs } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
                        <Link style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: "500", fontSize: "15px" }} to='/'> Home</Link>
                        <Link style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: "500", fontSize: "15px" }} to='/AllProduct'> AllProducts</Link>
                        <Link style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: "500", fontSize: "15px" }} to='/MyOrders'> MyOrders</Link>
                        <Link style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: "500", fontSize: "15px" }} to='/WatchLater'> WatchLater</Link>
                    </> :
                    <></>
            }
            {
                getUser?.role === "Seller" ?
                    <> <Link style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: '500', fontSize: "15px" }} to='/dashboard/addProduct'>AddProductProduct</Link>
                        <Link style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: '500', fontSize: "15px" }} to='/dashboard/myproduct'>MyProduct</Link></> :
                    <></>
            }
            {
                getUser?.role === "admin" ?
                    <> <Link style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: '500', fontSize: "15px" }} to='/dashboard/manageUser'>manageUser</Link>
                        <Link style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: '500', fontSize: "15px" }} to='/dashboard/manageSeller'>manageSeller</Link></> :
                    <></>
            }
        </div>
    );
};

export default NavManu;