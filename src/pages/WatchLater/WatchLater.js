import { Box, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { ProductContainer } from '../Home/HomeFlashsale/HomeFlashSalestyle';
import AllWatchLater from './AllWatchLater';
import './AllWatchLater.css'
const WatchLater = () => {
    const { user } = useContext(AuthContext);
    const url = ` https://goshop-server-teal.vercel.app/watchLater?email=${user?.email}`
    const { data: watchLater = [], isLoading } = useQuery({
        queryKey: ['watchLater'],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
    });
    console.log(watchLater.length);
    if (isLoading) {
        return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '150px 0px' }}>
            <CircularProgress />
        </Box>
    }
    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>Watch Later Products </h3>
            {
                watchLater?.length === 0 ? <div>
                    <h1 style={{ color: 'red', textAlign: 'center', marginTop: '200px' }}>No Product found</h1>
                </div> :
                    <div className='watchLater'>
                        {
                            watchLater.map(allWatchlater => <AllWatchLater
                                key={allWatchlater._id}
                                allWatchlater={allWatchlater}
                            ></AllWatchLater>)
                        }
                    </div>
            }

        </div>
    );
};

export default WatchLater;