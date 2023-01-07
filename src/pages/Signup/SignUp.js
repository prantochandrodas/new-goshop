import React, {  useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthProvider, { AuthContext } from '../Context/AuthProvider';
import Spinner from '../Spinner';


const Signup = () => {
    const [signupError,SetSignupError]=useState('');
    const {createUser,updateUser}=useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate=useNavigate();
    const handelSignin = data => {
       
        SetSignupError('');
        createUser(data.email,data.password)
        .then(result=>{
            const user = result.user;
            console.log(user);
            const userInfo={
                displayName:data.name
            }
            updateUser(userInfo)
           .then(()=>{
                 <Spinner></Spinner>
                saveUser(data.name,data.email,data.role);
                navigate('/');
           })
           .catch(error=>console.log(error))
        })
        .catch(error=>{
            SetSignupError(error.message);
        })
       
      
    }
    const saveUser=(name,email,role)=>{
        const users = {
            name,
            role,
            email

        }
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(users)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }
    return (
        <div className=' loginFrom'>
            <div className='LoginFromChild'>
            <h1 style={{fontSize:'2.25rem',lineHeight:'2.5rem'}}>SignUp</h1>
                <form onSubmit={handleSubmit(handelSignin)}>
                <div style={{width:'100%'}}>
                        <label >
                            <span  style={{fontSize:'20px',fontWeight:'500',margin:"10px 0px",display:'block'}}>Name</span>
                        </label>
                        <input type="text"
                            {...register("name", { required: "name is required" })}
                            placeholder="name" style={{backgroundColor:'#ffffff',padding:' 10px 10px' ,border:'1px solid gray',borderRadius:'5px' ,width:"100%"}} />
                        {errors.name && <p style={{color:"red"}} role="alert">{errors.name?.message}</p>}
                    </div>
                  <div style={{width:'100%'}}>
                        <label >
                            <span  style={{fontSize:'20px',fontWeight:'500',margin:"10px 0px",display:'block'}}>Email</span>
                        </label>
                        <input type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="email" style={{backgroundColor:'#ffffff',padding:' 10px 10px' ,border:'1px solid gray',borderRadius:'5px' ,width:"100%"}} />
                        {errors.email && <p style={{color:"red"}} role="alert">{errors.email?.message}</p>}
                    </div>
                    <div>
                        <label >
                            <span style={{fontSize:'20px',fontWeight:'500',margin:"10px 0px",display:'block'}}>password</span>
                        </label>
                        <input type="password"
                            {...register("password", { required: "password is required" ,minLength:{value:6,message:'password must be 6 charecters'}})}
                            placeholder="password" style={{backgroundColor:'#ffffff',padding:'10px 10px' ,border:'1px solid gray',borderRadius:'5px' ,width:"100%"}} />
                        {errors.password && <p style={{color:"red"}} role="alert">{errors.password?.message}</p>}
                    </div>
                    <div >
                        <select
                            {...register("role", { required: "Select the role" })}
                            className="" style={{width:'100%',fontSize:"15px" ,padding:"10px 10px",margin:"10px 0px"}}>
                            <option disabled  value='buyer'>Buyer</option>
                            <option value='buyer' style={{fontSize:'20px'}}>Buyer</option>
                            <option value='seller' style={{fontSize:'20px'}}>Seller</option>
                        </select>
                        {errors.role && <p className='text-red-600'>{errors.role?.message}</p>}
                    </div>
                    <input type="submit" style={{padding:"10px",backgroundColor:"#084f8a",color:'#ffffff',border:'0px',margin:'10px 0px',fontSize:'20px',fontWeight:'500',width:"100%"}} value='SignUp' />
                    {signupError && <p className='text-red-600'>{signupError}</p>}
                </form>
                <p style={{fontSize:"20px"}}>New to the site  ?<Link className='text-primary' to='/login'>Go to Login</Link></p>
            </div>
        </div>
    );
};

export default Signup;