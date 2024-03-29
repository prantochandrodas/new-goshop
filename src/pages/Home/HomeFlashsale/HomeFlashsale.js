import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import HomeFlashsales from './HomeFlashsales';
import './HomeFlashsale.css';
import { CardContainer } from './HomeFlashSalestyle';
import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider';
import BookingModal from '../../BookingModal/BookingModal';

const HomeFlashsale = () => {
    const [bookProduct,setBookProduct]=useState(null);
    const [open, setOpen] = React.useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [watchLater, setWatchLater] = useState(false);
    const { user } = useContext(AuthContext);
    const { data: flashSales = [], isLoading } = useQuery({
        queryKey: ['flashSale'],
        queryFn: () => fetch(' https://goshop-server-teal.vercel.app/flashSale')
            .then(res => res.json())

    });
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
            <h3 style={{textAlign:'center'}}>FlashSale</h3>
            {isLoading ? (<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '150px 0px' }}>
                <CircularProgress />
            </Box>) :
                <div data-aos="zoom-in"
                    data-aos-duration="1000" className='HomeFlashSale'>
                        {
                            flashSales.map(flashSale => <HomeFlashsales
                                key={flashSale._id}
                                flashSale={flashSale}
                                handelWatchLater={handelWatchLater}
                                setWatchLater={setWatchLater}
                                watchLater={watchLater}
                                handleOpen={handleOpen}
                                setBookProduct={setBookProduct}
                            ></HomeFlashsales>)
                        }
                </div>
            }
            <ToastContainer />
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

export default HomeFlashsale;