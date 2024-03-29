import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import { ProductContainer } from '../Home/HomeFlashsale/HomeFlashSalestyle';
import Product from './Product';
import './Products.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingModal from '../BookingModal/BookingModal';
const Products = () => {
    const [bookProduct,setBookProduct]=useState(null);
    const [open, setOpen] = React.useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { user } = useContext(AuthContext);
    const products = useLoaderData();
    const handelWatchLater = (product) => {
        const watchLater = {
            product_id: product._id,
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
                if (result === false) {
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
        <div>
            <div className='products'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        handelWatchLater={handelWatchLater}
                        handleOpen={handleOpen}
                        setBookProduct={setBookProduct}
                    ></Product>)
                }
                <ToastContainer />
            </div>
            {
                bookProduct && <BookingModal
                bookProduct={bookProduct}
                setBookProduct={setBookProduct}
                setOpen={setOpen}
                open={open}
                handleClose={handleClose}></BookingModal>
            }
        </div>

    );
};

export default Products;