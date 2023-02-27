import { Button, CircularProgress, TextField } from '@mui/material';
import React, {  useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './AddProduct.css';
import { AuthContext } from '../Context/AuthProvider';
import { Box } from '@mui/system';
import { toast, ToastContainer } from 'react-toastify';
const AddProduct = () => {
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const {user}=useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imgHostKey = process.env.REACT_APP_imgHostKey;
    const {data:categories=[]}=useQuery({
        queryKey:['categories'],
        queryFn:()=>fetch(' https://goshop-server-teal.vercel.app/category')
        .then(res=>res.json())

    });
    
   const handelAddProduct = data => {
    setLoading(true);
    const image = data.picture[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?&key=${imgHostKey}`;
    fetch(url, {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(imgData => {
            
            if (imgData.success) {
                console.log(imgData.data.url);
                // get verify from 

                const addProduct = {
                    category_id: data.category_id,
                    picture: imgData.data.url,
                    product_name: data.product_name,
                    saller_name: data.saller_name,
                    original_price: data.original_price,
                    posted_date: data.posted_date,
                    verified: 'verified',
                    sold_status: "available",
                    email:user?.email,
                    advertise:false,
                    paid:false
                }
              

                fetch(' https://goshop-server-teal.vercel.app/addProduct', {
                    method: 'POST',
                    headers: {
                      'content-type':'application/json',
                      authorization:`bearar ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(addProduct)

                })
                    .then(res => res.json())
                    .then(result => {
                        if(result.acknowledged){
                            setLoading(false);
                            navigate('/')
                        }
                    })
            }
        })
    }

    if(loading){
        return  <Box sx={{ display: 'flex' ,alignItems:'center',justifyContent:'center',margin:'150px 0px'}}>
        <CircularProgress />
      </Box>
    }
    return (
        <div className='loginFrom'>
            <div className='LoginFromChild'>
                <h1 style={{fontSize:'2.25rem',lineHeight:'2.5rem'}}>AddProduct</h1>
                <form onSubmit={handleSubmit(handelAddProduct)}>
                <TextField
                        type='text'
                        fullWidth
                        {...register("saller_name", { required: "saller_name is required" })}
                        placeholder='Enter Your saller_name'
                        id="saller_name"
                        label="saller_name"
                        variant="outlined"
                        error={Boolean(errors.saller_name)}
                        helperText={errors.saller_name?.message}
                        sx={{ marginBottom: 2 }}
                    />
                    
                     <TextField
                        type='text'
                        fullWidth
                        {...register("product_name", { required: "product_name is required" })}
                        placeholder='Enter Your product_name'
                        id="product_name"
                        label="product_name"
                        variant="outlined"
                        error={Boolean(errors.product_name)}
                        helperText={errors.product_name?.message}
                        sx={{ marginBottom: 2 }}
                    />
                    
                    <div style={{width:'95%'}}>
                        <label >
                            <span  style={{fontSize:'20px',fontWeight:'500',padding:' 10px 0px',display:'block'}}>picture</span>
                        </label>
                        <input type="file"
                            {...register("picture", { required: "picture is required" })}
                            placeholder="picture" style={{backgroundColor:'#ffffff',padding:' 10px 10px' ,border:'1px solid gray',borderRadius:'5px' ,width:"100%"}} />
                        {errors.picture && <p style={{color:"red"}} role="alert">{errors.picture?.message}</p>}
                    </div>

                    <TextField
                        type='number'
                        fullWidth
                        {...register("original_price", { required: "original_price is required" })}
                        placeholder='Enter Your original_price'
                        id="original_price"
                        label="original_price"
                        variant="outlined"
                        error={Boolean(errors.original_price)}
                        helperText={errors.original_price?.message}
                        sx={{ marginTop:2,marginBottom:2}}
                    />
                    
                     <TextField
                        type='date'
                        fullWidth
                        {...register("posted_date", { required: "posted_date is required" })}
                        placeholder='Enter Your posted_date'
                        id="posted_date"
                        variant="outlined"
                        error={Boolean(errors.posted_date)}
                        helperText={errors.posted_date?.message}
                        sx={{marginBottom:2}}
                    />
                    
                    <div style={{width:'100%', margin:" 10px 0"}} >
                        <label><span  style={{fontSize:'20px',fontWeight:'500',margin:"10px 0px",display:'block'}}>Category Name</span></label>
                        <select
                            {...register("category_id", { required: "Category is required" })}
                            style={{paddingLeft:"20px",paddingTop:'10px',paddingBottom:'10px', width:'100%'}}>
                                <option value='0'>Fashion</option>
                                <option value='1'>Sim Tools</option>
                                <option value='2'>Early Learning</option>
                                <option value='3'>Sweats</option>
                                <option value='4'>Joggers</option>
                                <option value='5'>Juice Drinks</option>
                                <option value='6'>Lens Cleaners</option>
                                <option value='7'>Smart Watches</option>
                                <option value='8'>Hoodies</option>
                                <option value='9'>Wireless Earbuds</option>
                                <option value='10'>Football</option>
                                <option value='11'>Face Masks</option>
                        </select>
                        {errors.category_id && <p className='text-red-600'>{errors.category_id?.message}</p>}
                    </div>


                    <Button type='submit' variant='contained' sx={{backgroundColor:'#27c4f5',fontWeight:'700'}} fullWidth>AddProduct</Button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddProduct;