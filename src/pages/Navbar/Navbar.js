import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { Avatar, Button, IconButton, Tab, Tabs, TextField, Toolbar, Tooltip, Typography, useMediaQuery, useTheme, useThemeProps } from '@mui/material';
import DrawerCompo from '../DrawerCompo/DrawerCompo';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import logo from '../../assets/Logo.png'
import { AuthContext } from '../Context/AuthProvider';
import './Navbar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NavManu from '../NavManu/NavManu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DropDownProfile from '../DropDownProfile/DropDownProfile';
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handelLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }
    const [value, setValue] = useState(false);
    const theme = useTheme();
    console.log(user);
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <React.Fragment>
            {
                isMatch ? (<>

                </>) : <>
                    {
                        user?.uid ? <NavManu></NavManu> : <></>
                    }
                </>
            }


            <AppBar sx={{ background: '#ffffff', position: 'sticky', padding: '10px!important' }} className="myAppbar" elevation={0}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <NavLink to='/'>{<img src={logo} height={80} alt="" className='appbarLogo' />}</NavLink>
                    {
                        isMatch ?

                            (<>
                                <DrawerCompo></DrawerCompo>
                            </>) :
                            (
                                <>
                                    {
                                        user?.uid ? <></> :
                                            <>
                                                <Link to='/login' style={{ marginLeft: "auto", textDecoration: 'none' }}><Button sx={{ marginLeft: 'auto' }} variant='contained'>Login</Button></Link>
                                                <Link to='/signup' style={{ marginLeft: "20px", textDecoration: 'none' }}><Button sx={{ marginLeft: 'auto' }} variant='contained'>SignUp</Button></Link>
                                            </>
                                    }
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginleft: 'auto' }}>
                                        <NavLink style={{ listStyle: "none", textDecoration: "none" }} to='/MyOrders'>
                                            <Tooltip title="Cart">
                                                <IconButton>
                                                    <ShoppingCartOutlinedIcon sx={{ fontSize: '30px', color: 'orange' }}></ShoppingCartOutlinedIcon>
                                                </IconButton>
                                            </Tooltip>
                                        </NavLink>
                                        {
                                            user?.photoURL || user?.uid ? <div style={{ marginLeft: 'auto' }} onClick={() => setValue((prev) => !prev)}>
                                                <Tooltip title="Click Here">
                                                    <IconButton>
                                                        <AccountCircleIcon sx={{ color: 'black', fontSize: '40px' }}></AccountCircleIcon>
                                                    </IconButton>
                                                </Tooltip>
                                            </div> : <></>
                                        }
                                        {
                                            value && <DropDownProfile setValue={setValue} style={{ fontSize: '35px' }}></DropDownProfile>
                                        }

                                    </div>

                                </>
                            )
                    }

                </Toolbar>

            </AppBar>
        </React.Fragment>
    );
};

export default Navbar;