import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../Context/AuthProvider';
import './BuyProduct.css';
const BuyProduct = () => {
    
    const { user } = useContext(AuthContext);
    const products = useLoaderData();
    console.log(products);
    const buyProducts=(products)=>{
        const placeOrder = {
            picture: products.picture,
            product_name: products.product_name,
            original_price: products.original_price,
            sold_status: "available",
            email: user?.email,
            advertise: false,
            paid: false
        }
        fetch('http://localhost:5000/placeOrder', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(placeOrder)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.acknowledged) {
                    toast.success('secessfully placed order!', {
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
        <div className='buyProduct-Container'>
                <div className='buyProduct-Container-img'>
                    <img src={products.picture}  className="responsiv" alt="" />
                </div>
                <div className='buyProduct'>
                    <Card>
                        <CardContent>
                            <Typography className='buyProduct-Product-Name' gutterBottom variant="h5" component="div" sx={{ fontWeight: '700' }}>
                                Product Name : <span className='buyProduct-Product-Name' style={{ fontSize: '20px', fontWeight: '400' }}>{products.product_name}</span>
                            </Typography>

                            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: '700' }}>
                                saller_name : <span style={{ fontSize: '20px', fontWeight: '400' }}>{products.saller_name}</span>
                            </Typography>
                            <Typography className='buyProduct-Product-Name' gutterBottom variant="h5" component="div" sx={{ fontWeight: '700' }}>
                                Price: <span className='buyProduct-Product-Name' style={{ fontSize: '20px', fontWeight: '400' }}> ${products.original_price}</span>
                            </Typography>
                            <Typography className='buyProduct-Product-Name' gutterBottom variant="h5" component="div" sx={{ fontWeight: '700' }}>
                                Posted Date: <span className='buyProduct-Product-Name' style={{ fontSize: '20px', fontWeight: '400' }}> {products.posted_date}</span>
                            </Typography>

                        </CardContent>
                        <CardActions>
                            <Button onClick={()=>buyProducts(products)} variant='contained' sx={{width:'50%',backgroundColor:'#2abbe8'}} className="button-font">Place Order</Button>
                        </CardActions>
                    </Card>
                    <ToastContainer />
                </div>
        </div>
    );
};

export default BuyProduct;