import { Avatar, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import './DropDownProfile.css'
const DropDownProfile = () => {
    const { user, logOut } = useContext(AuthContext);
    const handelLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }
    const { data: getUser = [], isLoading, refetch } = useQuery({
        queryKey: ['getUser'],
        queryFn: () => fetch(` https://goshop-server-teal.vercel.app/getUser?email=${user?.email}`)
            .then(res => res.json())
    });
    return (
        <div style={{display:'flex',color:'#000000'}} className="dropDownProfile">
            <ul style={{flexDirection:'column'}}>
                <li><Avatar alt="Prfile" src={user?.photoURL} /></li>            
                <li>{user?.displayName}</li>
                <li>{user?.email}</li>
                {
                    user?.uid ? <Button onClick={handelLogOut} sx={{ marginLeft: 'auto' }} variant='contained'>Logout</Button> :
                        <>
                            <Link to='/login' style={{ marginLeft: "auto", textDecoration: 'none' }}><Button sx={{ marginLeft: 'auto' }} variant='contained'>Login</Button></Link>
                            <Link to='/signup' style={{ marginLeft: "20px", textDecoration: 'none' }}><Button sx={{ marginLeft: 'auto' }} variant='contained'>SignUp</Button></Link>
                        </>
                }
            </ul>
        </div>
    );
};

export default DropDownProfile;