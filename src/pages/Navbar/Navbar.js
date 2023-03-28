import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { Avatar, Button, Tab, Tabs, TextField, Toolbar, Typography, useMediaQuery, useTheme, useThemeProps } from '@mui/material';
import DrawerCompo from '../DrawerCompo/DrawerCompo';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/Logo.png'
import { AuthContext } from '../Context/AuthProvider';
import './Navbar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
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


            <AppBar sx={{ background: '#ffffff', position: 'sticky', marginTop: '20px', padding:'0px!important' }} className="myAppbar" elevation={0}>
                <Toolbar>
                    {<img src={logo} height={80} alt="" className='appbarLogo' />}
                    {
                        isMatch ?

                            (<>
                                <div className='mobile-nav-search'>
                                    <TextField id="outlined-basic" label="Search" variant="outlined" className='mobile-search-field' size="small"/><SearchIcon sx={{ backgroundColor: 'orange', height: '40px', padding: '0px 10px', borderRadius: '0px 4px 4px 0px' }}></SearchIcon>
                                </div>
                                <DrawerCompo></DrawerCompo>
                            </>) :
                            (
                                <>
                                    <div className='nav-search'>
                                        <TextField id="outlined-basic" label="Search" variant="outlined" className='search-field' /><SearchIcon sx={{ background: 'orange', height: '56px', padding: '0px 15px', borderRadius: '0px 4px 4px 0px' }}></SearchIcon>
                                    </div>
                                    <ShoppingCartIcon sx={{ color: 'orange', fontSize: '40px', paddingLeft: '10px' }}></ShoppingCartIcon>
                                    {
                                        user?.uid ? <></> :
                                            <>
                                                <Link to='/login' style={{ marginLeft: "auto", textDecoration: 'none' }}><Button sx={{ marginLeft: 'auto' }} variant='contained'>Login</Button></Link>
                                                <Link to='/signup' style={{ marginLeft: "20px", textDecoration: 'none' }}><Button sx={{ marginLeft: 'auto' }} variant='contained'>SignUp</Button></Link>
                                            </>
                                    }
                                    {
                                        user?.photoURL || user?.uid ? <div style={{ marginLeft: 'auto' }} onClick={() => setValue((prev) => !prev)}><AccountCircleIcon sx={{ color: 'black', fontSize: '60px' }}></AccountCircleIcon></div> : <></>
                                    }

                                    {
                                        value && <DropDownProfile setValue={setValue}></DropDownProfile>
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