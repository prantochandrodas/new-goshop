import { Avatar, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import './DropDownProfile.css'
import EmailIcon from '@mui/icons-material/Email';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import LogoutIcon from '@mui/icons-material/Logout';
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
                        <li style={{display:'flex', alignItems:'center',justifyItems:'center'}}><Avatar alt="Prfile" src={user?.photoURL} sx={{marginRight:'6px'}} />{user?.displayName}</li>
                        <li style={{display:'flex', alignItems:'center',justifyItems:'center'}}><EmailIcon sx={{marginRight:'10px'}}></EmailIcon>{user?.email}</li>
                        <li style={{display:'flex', alignItems:'center',justifyItems:'center'}}><AutorenewIcon sx={{marginRight:'10px'}}></AutorenewIcon> Profile Status : {getUser.role}</li>
                        {
                            user?.uid ? <div onClick={()=>setValue((prev)=>!prev)}><li style={{display:'flex', alignItems:'center',justifyItems:'center',cursor:'pointer'}}><LogoutIcon></LogoutIcon><div onClick={handelLogOut} style={{marginLeft:'6px'}}>Logout</div></li></div> :
                                <>
                                    
                                </>
                        }
                    </ul>
                </div> : <></>
            }
        </div>

    );
};

export default DropDownProfile;