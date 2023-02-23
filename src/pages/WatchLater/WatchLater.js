import { Box, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { ProductContainer } from '../Home/HomeFlashsale/HomeFlashSalestyle';
import AllWatchLater from './AllWatchLater';

const WatchLater = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/watchLater?email=${user?.email}`
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
        return <Box sx={{ display: 'flex' ,alignItems:'center',justifyContent:'center',margin:'150px 0px'}}>
        <CircularProgress />
      </Box>
    }
    return (
        <div>
            <h1 style={{textAlign:'center'}}>Watch Later Products </h1>
            {
                watchLater?.length===0?<div>
                    <h1 style={{color:'red',textAlign:'center',marginTop:'200px'}}>No Product found</h1>
                </div>:
                <div>
                    <ProductContainer>
                        {
                            watchLater.map(allWatchlater => <AllWatchLater
                                key={allWatchlater._id}
                                allWatchlater={allWatchlater}
                            ></AllWatchLater>)
                        }
                    </ProductContainer>
            </div>
            }
            
        </div>
    );
};

export default WatchLater;