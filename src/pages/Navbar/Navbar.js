import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme, useThemeProps } from '@mui/material';
import DrawerCompo from '../DrawerCompo/DrawerCompo';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/Logo.png'
import { AuthContext } from '../Context/AuthProvider';
import './Navbar.css';
import { useQuery } from '@tanstack/react-query';
const Navbar = () => {
    const {user,logOut}=useContext(AuthContext);
    const {data:getUser=[],isLoading,refetch}=useQuery({
        queryKey:['getUser'],
        queryFn:()=>fetch(` https://goshop-server-teal.vercel.app/getUser?email=${user?.email}`)
        .then(res=>res.json())
    }); 
    const handelLogOut=()=>{
        logOut()
        .then(()=>{})
        .catch(error=>console.log(error))
    }
    const [value, setValue] = useState();
    const theme = useTheme();
    console.log(theme);
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    console.log(isMatch);
    return (
        <React.Fragment>
            <AppBar sx={{ background: '#ffffff',position:'sticky' }} elevation={0}>
                <Toolbar>
                { <img src={logo} height={80} alt="" /> }
                    {
                        isMatch ?

                            (<>
                            
                                <DrawerCompo></DrawerCompo>
                            </>) :
                            (
                                <>
                                    <Tabs className='myLink' textColor="inherit" style={{display:'flex',alignItems:'center'}} value={value} onChange={(e, value) => setValue(value)} indicatorColor="primary">
                                      {
                                        user?.uid?
                                       <> 
                                       <Link style={{color:'black',listStyle:"none", textDecoration:"none", marginLeft:'20px',fontWeight:"500",fontSize:"15px"}}  to='/'> Home</Link>
                                       <Link style={{color:'black',listStyle:"none", textDecoration:"none", marginLeft:'20px',fontWeight:"500",fontSize:"15px"}}  to='/AllProduct'> AllProducts</Link>
                                       <Link style={{color:'black',listStyle:"none", textDecoration:"none", marginLeft:'20px',fontWeight:"500",fontSize:"15px"}}  to='/MyOrders'> MyOrders</Link>
                                       <Link style={{color:'black',listStyle:"none", textDecoration:"none", marginLeft:'20px',fontWeight:"500",fontSize:"15px"}}  to='/WatchLater'> WatchLater</Link>
                                      </> :
                                        <></>
                                      }
                                       {
                                          getUser?.role==="Seller"?
                                           <> <Link style={{color:'black',listStyle:"none", textDecoration:"none", marginLeft:'20px', fontWeight:'500',fontSize:"15px"}} to='/dashboard/addProduct'>AddProductProduct</Link>
                                           <Link style={{color:'black',listStyle:"none", textDecoration:"none", marginLeft:'20px', fontWeight:'500',fontSize:"15px"}} to='/dashboard/myproduct'>MyProduct</Link></>:
                                           <></>
                                        }
                                          {
                                          getUser?.role==="admin"?
                                           <> <Link style={{color:'black',listStyle:"none", textDecoration:"none", marginLeft:'20px', fontWeight:'500',fontSize:"15px"}} to='/dashboard/manageUser'>manageUser</Link>
                                           <Link style={{color:'black',listStyle:"none", textDecoration:"none", marginLeft:'20px', fontWeight:'500',fontSize:"15px"}} to='/dashboard/manageSeller'>manageSeller</Link></>:
                                           <></>
                                        }
                                    </Tabs>
                                    {
                                        user?.uid ?  <Button onClick={handelLogOut} sx={{ marginLeft: 'auto' }} variant='contained'>Logout</Button>:
                                        <>
                                         <Link to='/login' style={{marginLeft:"auto",textDecoration:'none'}}><Button sx={{ marginLeft: 'auto' }} variant='contained'>Login</Button></Link>
                                          <Link to='/signup' style={{marginLeft:"20px",textDecoration:'none'}}><Button sx={{ marginLeft: 'auto' }} variant='contained'>SignUp</Button></Link>
                                        </>
                                  }
                                 
                                </>
                            )
                    }

                </Toolbar>

            </AppBar>
        </React.Fragment>
    );
};

export default Navbar;