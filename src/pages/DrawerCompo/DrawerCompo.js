import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useContext, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import './DrawerCompo.css'
const DrawerCompo = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const {user,logOut}=useContext(AuthContext);
    const {data:getUser=[],isLoading,refetch}=useQuery({
        queryKey:['getUser'],
        queryFn:()=>fetch(` https://goshop-server-teal.vercel.app/getUser?email=${user?.email}`)
        .then(res=>res.json())
    }); 
    return (
        <React.Fragment>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <List>
                    <ListItemButton>
                        <ListItemIcon>
                            <ListItemText>
                                     {
                                        user?.uid?
                                       <> 
                                       <div  style={{marginBottom:'15px',display:'flex',alignItems:'center',justifyContent:'left'}}><HomeOutlinedIcon></HomeOutlinedIcon><NavLink style={{color:'black',listStyle:"none", textDecoration:"none", display:'block',fontWeight:"500",fontSize:"15px",padding:'0px 10px'}}  to='/'>Home</NavLink></div>
                                       <div  style={{marginBottom:'15px',display:'flex',alignItems:'center',justifyContent:'left'}}><ProductionQuantityLimitsOutlinedIcon></ProductionQuantityLimitsOutlinedIcon><NavLink style={{color:'black',listStyle:"none", textDecoration:"none", display:'block',fontWeight:"500",fontSize:"15px",padding:'0px 10px'}}  to='/AllProduct'> AllProducts</NavLink></div>
                                       <div  style={{marginBottom:'15px',display:'flex',alignItems:'center',justifyContent:'left'}}><BorderColorOutlinedIcon></BorderColorOutlinedIcon><NavLink style={{color:'black',listStyle:"none", textDecoration:"none", display:'block',fontWeight:"500",fontSize:"15px",padding:'0px 10px'}}  to='/MyOrders'> MyOrders</NavLink></div>
                                       <div  style={{marginBottom:'15px',display:'flex',alignItems:'center',justifyContent:'left'}}><WatchLaterOutlinedIcon></WatchLaterOutlinedIcon><NavLink style={{color:'black',listStyle:"none", textDecoration:"none", display:'block',fontWeight:"500",fontSize:"15px",padding:'0px 10px'}}  to='/WatchLater'> WatchLater</NavLink></div>
                                      
                                      </> :
                                        <></>
                                      }
                                       {
                                          getUser?.role==="Seller"?
                                           <> <div  style={{marginBottom:'15px',display:'flex',alignItems:'center',justifyContent:'left'}}><AddCardOutlinedIcon></AddCardOutlinedIcon><NavLink style={{color:'black',listStyle:"none", textDecoration:"none", display:'block',fontWeight:"500",fontSize:"15px",padding:'0px 10px'}}  to='/dashboard/addProduct'> AddProductProduct</NavLink></div>
                                           <div  style={{marginBottom:'15px',display:'flex',alignItems:'center',justifyContent:'left'}}><AddCommentOutlinedIcon></AddCommentOutlinedIcon><NavLink style={{color:'black',listStyle:"none", textDecoration:"none", display:'block',fontWeight:"500",fontSize:"15px",padding:'0px 10px'}}  to='/dashboard/myproduct'> My product</NavLink></div>
                                           </>:
                                           <></>
                                        }
                                          {
                                          getUser?.role==="admin"?
                                           <> 
                                           <div  style={{marginBottom:'15px',display:'flex',alignItems:'center',justifyContent:'left'}}><AccountCircleOutlinedIcon></AccountCircleOutlinedIcon><NavLink style={{color:'black',listStyle:"none", textDecoration:"none", display:'block',fontWeight:"500",fontSize:"15px",padding:'0px 10px'}}  to='/dashboard/manageUser'> Manage User</NavLink></div>
                                           <div  style={{marginBottom:'15px',display:'flex',alignItems:'center',justifyContent:'left'}}><AddReactionOutlinedIcon></AddReactionOutlinedIcon><NavLink style={{color:'black',listStyle:"none", textDecoration:"none", display:'block',fontWeight:"500",fontSize:"15px",padding:'0px 10px'}}  to='/dashboard/myproduct'> Manage Seller</NavLink></div>
                                           </>:
                                           <></>
                                        }
                            </ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                </List>
            </Drawer>
            <IconButton sx={{ color: 'black', marginLeft: "auto" }} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon></MenuIcon>
            </IconButton>
        </React.Fragment>
    );
};

export default DrawerCompo;