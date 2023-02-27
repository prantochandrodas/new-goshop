import { Button, CircularProgress, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { GoogleAuthProvider } from 'firebase/auth';
import React, {  useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import Variants from '../Skelaton/Skelaton';
import './Login.css';


const Login = () => {
    const [loading,setLoading]=useState(false);
  const {signIn,createUserWithGoogle}=useContext(AuthContext);
   const location = useLocation();
   const navigate=useNavigate();
   const from=location.state?.from?.pathname || '/';
    const { register, formState: { errors }, handleSubmit } = useForm();
   const [loginError,setLoginError]=useState();
   
   const provider = new GoogleAuthProvider();
   const handellogin = data => {
    setLoading(true);
        signIn(data.email,data.password)
        .then(result=>{
            const user=result.user;
            console.log(user);
            navigate(from,{replace:true});
            setLoading(false);
        })
        .catch(error=>{
            console.log(error);
            setLoginError(error.message);
            setLoading(false);
        })
    }
    const handelGoogleSignup = () => {
        setLoading(true);
        createUserWithGoogle(provider)
            .then(result => {
                const user = result.user;
                fetch(` https://goshop-server-teal.vercel.app/googleUser?email=${user?.email}&name=${user?.displayName}`, {
                    method: 'PUT',
                })
                    .then(res => res.json())
                    .then(data => {
                        const user=data.user;
                        console.log(user);
                         navigate(from, { replace: true });
                         setLoading(false);
                    })
            })
           
    }

    if (loading) {
        return <Box sx={{ display: 'flex' ,alignItems:'center',justifyContent:'center',margin:'150px 0px'}}>
        <CircularProgress />
      </Box>
    }
    return (
        <div className=' loginFrom'>
            <div className='LoginFromChild'>
                <h1 style={{fontSize:'2.25rem',lineHeight:'2.5rem'}}>Login</h1>
                <form onSubmit={handleSubmit(handellogin)}>

                <TextField
                        type='email'
                        fullWidth
                        placeholder='Enter Your email'
                        {...register("email", { required: "Email is required" })}
                        id="Email"
                        label="Email"
                        variant="outlined"
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                        sx={{ marginBottom: 2 }}
                    />
                   <TextField
                        type='password'
                        fullWidth
                        {...register("password", { required: "password is required" })}
                        placeholder='Enter Your password'
                        id="Password"
                        label="Password"
                        variant="outlined"
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                        sx={{ marginBottom: 2 }}
                    />
                   
                    <Button type='submit' variant='contained' sx={{backgroundColor:'#27c4f5',fontWeight:'700'}} fullWidth>Login</Button>
                </form>
                {loginError && <p className='text-red-600'>{loginError}</p>}
                <p style={{fontSize:"20px"}}>If you don't have an account<Link style={{color:'blue' }} to='/signup'> Go to SignUp</Link></p>
                <button style={{padding:"10px",backgroundColor:"#21130d",border:'0px', color:'#ffffff',margin:'10px 0px',fontSize:'20px',fontWeight:'500',width:"100%"}} onClick={handelGoogleSignup} >continue with google</button>
            </div>
        </div>
    );
};

export default Login;