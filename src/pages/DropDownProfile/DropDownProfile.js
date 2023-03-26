import { Avatar, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import './DropDownProfile.css'
const DropDownProfile = ({setValue}) => {
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
        <div>
            {
                user?.uid ? <div style={{ display: 'flex', color: '#000000' }} className="dropDownProfile">
                    <ul style={{ flexDirection: 'column' }}>
                        <li><Avatar alt="Prfile" src={user?.photoURL} /></li>
                        <li>{user?.displayName}</li>
                        <li>{user?.email}</li>
                        <li>Profile Status : {getUser.role}</li>
                        {
                            user?.uid ? <div onClick={()=>setValue((prev)=>!prev)}><Button onClick={handelLogOut} sx={{ marginLeft: 'auto' }} variant='contained'>Logout</Button></div> :
                                <>
                                    <Link to='/login' style={{ marginLeft: "auto", textDecoration: 'none' }}><Button sx={{ marginLeft: 'auto' }} variant='contained'>Login</Button></Link>
                                    <Link to='/signup' style={{ marginLeft: "20px", textDecoration: 'none' }}><Button sx={{ marginLeft: 'auto' }} variant='contained'>SignUp</Button></Link>
                                </>
                        }
                    </ul>
                </div> : <></>
            }
        </div>

    );
};

export default DropDownProfile;