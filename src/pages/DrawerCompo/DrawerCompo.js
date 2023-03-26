import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useContext, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
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
                                       <Link style={{color:'black',listStyle:"none", textDecoration:"none", display:'block', margin:'20px 0px',fontWeight:"500",fontSize:"15px"}}  to='/'> Home</Link>
                                       <Link style={{color:'black',listStyle:"none", textDecoration:"none", display:'block', margin:'20px 0px',fontWeight:"500",fontSize:"15px"}}  to='/AllProduct'> AllProducts</Link>
                                       <Link style={{color:'black',listStyle:"none", textDecoration:"none", display:'block', margin:'20px 0px',fontWeight:"500",fontSize:"15px"}}  to='/MyOrders'> MyOrders</Link>
                                       <Link style={{color:'black',listStyle:"none", textDecoration:"none", display:'block', margin:'20px 0px',fontWeight:"500",fontSize:"15px"}}  to='/WatchLater'> WatchLater</Link>
                                      </> :
                                        <></>
                                      }
                                       {
                                          getUser?.role==="Seller"?
                                           <> <Link style={{color:'black',listStyle:"none",  display:'block', textDecoration:"none", margin:'20px 0px', fontWeight:'500',fontSize:"15px"}} to='/dashboard/addProduct'>AddProductProduct</Link>
                                           <Link style={{color:'black',listStyle:"none",  display:'block', textDecoration:"none", margin:'20px 0px', fontWeight:'500',fontSize:"15px"}} to='/dashboard/myproduct'>MyProduct</Link></>:
                                           <></>
                                        }
                                          {
                                          getUser?.role==="admin"?
                                           <> <Link style={{color:'black',listStyle:"none",  display:'block', textDecoration:"none", margin:'20px 0px', fontWeight:'500',fontSize:"15px"}} to='/dashboard/manageUser'>manageUser</Link>
                                           <Link style={{color:'black',listStyle:"none",  display:'block', textDecoration:"none", margin:'20px 0px', fontWeight:'500',fontSize:"15px"}} to='/dashboard/manageSeller'>manageSeller</Link></>:
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