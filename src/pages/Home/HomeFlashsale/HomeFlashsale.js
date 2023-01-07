import { useQuery } from '@tanstack/react-query';
import React from 'react';
import HomeFlashsales from './HomeFlashsales';
import './HomeFlashsale.css';
import { HeaderText,CardContainer } from './HomeFlashSalestyle';
const HomeFlashsale = () => {
    const {data:flashSales=[]}=useQuery({
        queryKey:['flashSale'],
        queryFn:()=>fetch('http://localhost:5000/flashSale')
        .then(res=>res.json())

    });
    console.log(flashSales);
    return (
        <div  style={{width:'90%',margin:'40px auto'}}>
          <HeaderText>FlashSale</HeaderText>  
          <CardContainer>
                {
                    flashSales.map(flashSale=><HomeFlashsales
                        key={flashSale._id}
                        flashSale={flashSale}
                    ></HomeFlashsales>)
                }
            </CardContainer>
        </div>
    );
};

export default HomeFlashsale;