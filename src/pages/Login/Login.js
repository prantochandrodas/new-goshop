import { GoogleAuthProvider } from 'firebase/auth';
import React, {  useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import './Login.css';


const Login = () => {
  const {signIn,createUserWithGoogle}=useContext(AuthContext);
   const location = useLocation();
   const navigate=useNavigate();
   const from=location.state?.from?.pathname || '/';
    const { register, formState: { errors }, handleSubmit } = useForm();
   const [loginError,setLoginError]=useState();
   
   const provider = new GoogleAuthProvider();
   const handellogin = data => {
        signIn(data.email,data.password)
        .then(result=>{
            const user=result.user;
            console.log(user);
            navigate(from,{replace:true});
        })
        .catch(error=>{
            console.log(error);
            setLoginError(error.message);
        })
    }
    const handelGoogleSignup = () => {
        createUserWithGoogle(provider)
            .then(result => {
                const user = result.user;
                fetch(`http://localhost:5000/googleUser?email=${user?.email}&name=${user?.displayName}`, {
                    method: 'PUT',
                })
                    .then(res => res.json())
                    .then(data => {
                        const user=data.user;
                        console.log(user);
                         navigate(from, { replace: true });
                    })
            })
           
    }
    return (
        <div className=' loginFrom'>
            <div className='LoginFromChild'>
                <h1 style={{fontSize:'2.25rem',lineHeight:'2.5rem'}}>Login</h1>
                <form onSubmit={handleSubmit(handellogin)}>

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
                    <input type="submit" style={{padding:"10px",backgroundColor:"#084f8a",color:'#ffffff',border:'0px',margin:'10px 0px',fontSize:'20px',fontWeight:'500',width:"100%"}} value='Login' />
                <div>
                    {loginError && <p style={{color:"red"}}>{loginError}</p>}
                </div>
                </form>
                <p style={{fontSize:"20px"}}>If you don't have an account<Link style={{color:'blue'}} to='/signup'> Go to SignUp</Link></p>
                <button style={{padding:"10px",backgroundColor:"#21130d",border:'0px', color:'#ffffff',margin:'10px 0px',fontSize:'20px',fontWeight:'500',width:"100%"}} onClick={handelGoogleSignup} >continue with google</button>
            </div>
        </div>
    );
};

export default Login;