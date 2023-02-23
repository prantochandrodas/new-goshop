import { Box, CircularProgress } from '@mui/material';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../pages/Context/AuthProvider';


const PrivetRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext);
    const location=useLocation();
    if(loading){
        return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '150px 0px' }}>
        <CircularProgress />
    </Box>
    }
    if(user){
        return children;
    }
    return <Navigate to='/login' state={{from:location}} replace></Navigate>;
};

export default PrivetRoute;