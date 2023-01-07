import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
const DrawerCompo = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <React.Fragment>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <List>
                    <ListItemButton>
                        <ListItemIcon>
                            <ListItemText>
                                <Link style={{ color: 'black', listStyle: "none", textDecoration: "none", display:'block', margin:'20px 0px', marginLeft: '20px', fontWeight: "bold", fontSize: "20px" }} to='/'> Home</Link>
                                <Link style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: 'bold', fontSize: "20px" }} to='/addProduct'> AddProduct</Link>
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