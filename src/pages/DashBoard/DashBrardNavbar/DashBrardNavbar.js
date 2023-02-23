import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import logo from '../../../assets/Logo.png'
import { Button, Tabs, Toolbar, useMediaQuery, useTheme, useThemeProps } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DashBoardDrawerCompo from '../DashBoardDrawerCompo/DashBoardDrawerCompo';
import { AuthContext } from '../../Context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
const DashBrardNavbar = () => {
    const {user,logOut}=useContext(AuthContext);
    const {data:getUser=[],isLoading,refetch}=useQuery({
        queryKey:['getUser'],
        queryFn:()=>fetch(`http://localhost:5000/getUser?email=${user?.email}`)
        .then(res=>res.json())
    }); 
    console.log(getUser);
    const navigate=useNavigate();
    const handelLogOut=()=>{
        logOut()
        .then(()=>{
            navigate('/login')
        })
        .catch(error=>console.log(error))
    }
    const [value, setValue] = useState();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <React.Fragment>
            <AppBar sx={{ background: '#ffffff', position:'sticky'}} elevation={0}>
                <Toolbar>
                { <img src={logo} height={80} alt="" /> }
                    {
                        isMatch ?

                            (<>
                            
                                <DashBoardDrawerCompo></DashBoardDrawerCompo>
                            </>) :
                            (
                                <>
                                    <Tabs className='myLink' textColor="inherit" style={{display:'flex',alignItems:'center'}} value={value} onChange={(e, value) => setValue(value)} indicatorColor="primary">
                                     
                                       <Link style={{color:'black',listStyle:"none", textDecoration:"none", marginLeft:'20px',fontWeight:"500",fontSize:"15px"}}  to='/'> Home</Link>
                                       <Link style={{color:'black',listStyle:"none", textDecoration:"none", marginLeft:'20px',fontWeight:"500",fontSize:"15px"}}  to='/dashboard'> MyOrders</Link>
                                       <Link style={{color:'black',listStyle:"none", textDecoration:"none", marginLeft:'20px',fontWeight:"500",fontSize:"15px"}}  to='/dashboard/WatchLater'> WatchLater</Link>
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

export default DashBrardNavbar;