import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import HomeFlashsales from './HomeFlashsales';
import './HomeFlashsale.css';
import { HeaderText, CardContainer } from './HomeFlashSalestyle';
import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';

const HomeFlashsale = () => {
    const { data: flashSales = [], isLoading } = useQuery({
        queryKey: ['flashSale'],
        queryFn: () => fetch('http://localhost:5000/flashSale')
            .then(res => res.json())

    });
    
    return (
        <div style={{ width: '90%', margin: '40px auto' }}>
            <HeaderText>FlashSale</HeaderText>
            {isLoading ? (<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '150px 0px' }}>
                <CircularProgress />
            </Box>) :
            <div data-aos="zoom-in"
                     data-aos-duration="1000">
                <CardContainer>
                    {
                        flashSales.map(flashSale => <HomeFlashsales
                            key={flashSale._id}
                            flashSale={flashSale}
                        // loading={loading}
                        ></HomeFlashsales>)
                    }
                </CardContainer>
            </div>
            }

        </div>
    );
};

export default HomeFlashsale;