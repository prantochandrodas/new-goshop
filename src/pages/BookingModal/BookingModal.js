import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import './BookingModal.css'
const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
 borderRadius:'5px',
  boxShadow: 24,
  p: 4,
};

export default function BookingModal({setOpen,open,handleClose,bookProduct,setBookProduct}) {
 const {user}=useContext(AuthContext);
 const buyProducts=(products)=>{
    const placeOrder = {
        product_id:products._id,
        picture: products.picture,
        product_name: products.product_name,
        original_price: products.original_price,
        sold_status: "available",
        email: user?.email,
        advertise: false,
        paid: false
    }
    fetch(' https://goshop-server-teal.vercel.app/placeOrder', {
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
                 setOpen(false);
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
            setOpen(false);
           }
        })
}
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className='res'>
            <img src={bookProduct.picture} width={200} alt="" />
            <Typography id="spring-modal-title" variant="h6" component="h2">
           <span style={{fontWeight:'600'}}>Product Name :</span>  {bookProduct.product_name}
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
            Price: {bookProduct.original_price}
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
            Posted Date:  {bookProduct.posted_date}
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
            Product Status: {bookProduct.sold_status}
            </Typography>
            <Button onClick={()=>buyProducts(bookProduct)} variant='contained' sx={{width:'50%',backgroundColor:'#2abbe8'}} className="button-font">Place Order</Button>
          </Box>
        </Fade>
      </Modal>
      <ToastContainer />
    </div>
  );
}