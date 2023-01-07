import { Button } from '@mui/material';
import React, {  useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './AddProduct.css';
import { AuthContext } from '../Context/AuthProvider';
const AddProduct = () => {
    const navigate=useNavigate();
    const {user}=useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imgHostKey = process.env.REACT_APP_imgHostKey;
    const {data:categories=[]}=useQuery({
        queryKey:['categories'],
        queryFn:()=>fetch('http://localhost:5000/category')
        .then(res=>res.json())

    });
    
   const handelAddProduct = data => {
    console.log(data);
    const image = data.picture[0];
    console.log(image);
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
              

                fetch('http://localhost:5000/addProduct', {
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
                           
                            navigate('/')
                        
                        }
                        
                    })

            }
        })
    }
    return (
        <div className=' loginFrom' style={{marginTop:'100px'}}>
            <div className='LoginFromChild'>
                <h1 style={{fontSize:'2.25rem',lineHeight:'2.5rem'}}>AddProduct</h1>
                <form onSubmit={handleSubmit(handelAddProduct)}>

                    <div style={{width:'100%'}}>
                        <label >
                            <span  style={{fontSize:'20px',fontWeight:'500',padding:' 10px 0px',display:'block'}}>Name</span>
                        </label>
                        <input type="text"
                            {...register("saller_name", { required: "saller_name is required" })}
                            placeholder="saller_name" style={{backgroundColor:'#ffffff',padding:'10px 10px' ,border:'1px solid gray',borderRadius:'5px' ,width:"100%"}} />
                        {errors.saller_name && <p style={{color:"red"}} role="alert">{errors.saller_name?.message}</p>}
                    </div>


                    <div style={{width:'100%'}}>
                        <label >
                            <span  style={{fontSize:'20px',fontWeight:'500',padding:' 10px 0px',display:'block'}}>Product_name</span>
                        </label>
                        <input type="text"
                            {...register("product_name", { required: "product_name is required" })}
                            placeholder="product_name" style={{backgroundColor:'#ffffff',padding:' 10px 10px' ,border:'1px solid gray',borderRadius:'5px' ,width:"100%"}} />
                        {errors.product_name && <p style={{color:"red"}} role="alert">{errors.product_name?.message}</p>}
                    </div>


                    <div style={{width:'100%'}}>
                        <label >
                            <span  style={{fontSize:'20px',fontWeight:'500',padding:' 10px 0px',display:'block'}}>picture</span>
                        </label>
                        <input type="file"
                            {...register("picture", { required: "picture is required" })}
                            placeholder="picture" style={{backgroundColor:'#ffffff',padding:' 10px 10px' ,border:'1px solid gray',borderRadius:'5px' ,width:"100%"}} />
                        {errors.picture && <p style={{color:"red"}} role="alert">{errors.picture?.message}</p>}
                    </div>


                    <div>
                        <label >
                            <span style={{fontSize:'20px',fontWeight:'500',margin:"10px 0px",display:'block'}}>price</span>
                        </label>
                        <input type="number"
                            {...register("original_price", { required: "original_price is required" })}
                            placeholder="original_price" style={{backgroundColor:'#ffffff',padding:' 10px 10px' ,border:'1px solid gray',borderRadius:'5px' ,width:"100%"}} />
                        {errors.original_price && <p style={{color:"red"}} role="alert">{errors.original_price?.message}</p>}
                    </div>
                    
                    <div style={{width:'100%'}}>
                        <label >
                            <span  style={{fontSize:'20px',fontWeight:'500',margin:"10px 0px",display:'block'}}>Date</span>
                        </label>
                        <input type="date"
                            {...register("posted_date", { required: "posted_date is required" })}
                            placeholder="posted_date" style={{backgroundColor:'#ffffff',padding:' 10px 10px' ,border:'1px solid gray',borderRadius:'5px' ,width:"100%"}} />
                        {errors.posted_date && <p style={{color:"red"}} role="alert">{errors.posted_date?.message}</p>}
                    </div>

                   
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


                    <input type="submit" style={{padding:"10px",backgroundColor:"#084f8a",color:'#ffffff',border:'0px',margin:'10px 0px',fontSize:'20px',fontWeight:'500',width:"100%"}} value='Add Product' />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;