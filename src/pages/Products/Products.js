import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import { ProductContainer } from '../Home/HomeFlashsale/HomeFlashSalestyle';
import Spinner from '../Spinner';
import Product from './Product';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Products = () => {
    const { user } = useContext(AuthContext);
    const products = useLoaderData();
    const handelWatchLater = (product) => {
        const watchLater = {
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
        fetch('http://localhost:5000/watchLater', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearar ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(watchLater)

        })
            .then(res => res.json())
            .then(result => {
                if (result.acknowledged) {
                    <Spinner></Spinner>
                    toast.success('🦄 Wow so easy!', {
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
            <ProductContainer>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        handelWatchLater={handelWatchLater}
                    ></Product>)
                }
            </ProductContainer>
            <ToastContainer />
        </div>
    );
};

export default Products;