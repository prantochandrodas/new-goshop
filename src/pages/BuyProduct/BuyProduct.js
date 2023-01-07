import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { PlaceOrderContainer } from '../Home/HomeFlashsale/HomeFlashSalestyle';
import './BuyProduct.css';
const BuyProduct = () => {
    const products = useLoaderData();
    return (
        <div style={{ height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <PlaceOrderContainer>
                <div style={{marginRight:'10px'}}>
                    <img src={products.picture} style={{ height: '350px' }} className="responsiv" alt="" />
                </div>
                <div className=''>
                    <Card sx={{ width: 345 ,margin:'20px auto'}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: '700' }}>
                                Product Name : <span style={{ fontSize: '20px', fontWeight: '400' }}>{products.product_name}</span>
                            </Typography>

                            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: '700' }}>
                                saller_name : <span style={{ fontSize: '20px', fontWeight: '400' }}>{products.saller_name}</span>
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: '700' }}>
                                Price: <span style={{ fontSize: '20px', fontWeight: '400' }}> ${products.original_price}</span>
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: '700' }}>
                                Posted Date: <span style={{ fontSize: '20px', fontWeight: '400' }}> {products.posted_date}</span>
                            </Typography>

                        </CardContent>
                        <CardActions>
                            <Button variant='contained' sx={{width:'100%'}}>Place Order</Button>
                        </CardActions>
                    </Card>
                </div>
            </PlaceOrderContainer>
        </div>
    );
};

export default BuyProduct;