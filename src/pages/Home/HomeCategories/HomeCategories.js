import { Box, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import HomeCategory from '../HomeCategory/HomeCategory';
import { HeaderText } from '../HomeFlashsale/HomeFlashSalestyle';
import './HomeCategories.css';

const HomeCategories = () => {
    const {data:categories=[],isLoading}=useQuery({
        queryKey:['categories'],
        queryFn:()=>fetch('http://localhost:5000/category')
        .then(res=>res.json())

    });
    console.log(categories);

    return (
        <div  data-aos="zoom-in"
        data-aos-duration="1000"  className='categories' style={{width:'90%',margin:'40px auto'}}>
            <HeaderText>Categories</HeaderText>
            {isLoading?(<Box sx={{ display: 'flex' ,alignItems:'center',justifyContent:'center',margin:'150px 0px'}}>
        <CircularProgress />
      </Box>):<>
      <div className='gridCategory' style={{marin:'10px 0px!important'}}>
                {
                    categories.map(category=><HomeCategory
                        key={category._id}
                        category={category}
                    ></HomeCategory>)
                }
            </div>
      </>}
            
        </div>
    );
};

export default HomeCategories;