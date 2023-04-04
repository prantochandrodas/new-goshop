import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthProvider';
import { CardContainer, HeaderText } from '../Home/HomeFlashsale/HomeFlashSalestyle';
import AllProduct from './AllProduct';

const AllProducts = () => {
    const{user}=useContext(AuthContext);
    const { data: allProducts = [], isLoading } = useQuery({
        queryKey: ['allProducts'],
        queryFn: () => fetch(' https://goshop-server-teal.vercel.app/allProducts')
            .then(res => res.json())

    });
    console.log(allProducts);
    const handelWatchLater = (product) => { 
        const watchLater = {
            product_id:product._id,
            category_id: product.category_id,
            picture: product.picture,
            product_name: product.product_name,
            saller_name: product.saller_name,
            original_price: product.original_price,
            posted_date: product.posted_date,
            verified: 'verified',
            sold_status: "available",
            email: user?.email,
            advertise: false,
            paid: false
        }
        fetch(' https://goshop-server-teal.vercel.app/watchLater', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearar ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(watchLater)

        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.acknowledged) {
                    toast.success('Sucess fully Added', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
               if(result===false){
                toast.info('Already Added', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
               }
            })
    }
    return (
        <div style={{ width: '90%', margin: '40px auto' }}>
           <h3>AllProducts</h3> 
            {isLoading ? (<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '150px 0px' }}>
                <CircularProgress />
            </Box>) :
            <div data-aos="zoom-in"
                     data-aos-duration="1000">
                <CardContainer>
                    {
                        allProducts.map(allProduct=><AllProduct
                            key={allProduct._id}
                            allProduct={allProduct}
                            handelWatchLater={handelWatchLater}
                        ></AllProduct>)
                    }
                </CardContainer>
            </div>
            }
        </div>
    );
};

export default AllProducts;