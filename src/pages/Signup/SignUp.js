import { Button, CircularProgress, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';


const Signup = () => {
    const [role,setRole]=useState('');
    const [signupError, SetSignupError] = useState('');
    const [loading, setLoading] = useState(false);
    const { createUser, updateUser } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const handelChange=(event)=>{
        setRole(event.target.value);
    }
    const handelSignin = data => {
        console.log(data);
        setLoading(true);
        SetSignupError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        setLoading(false);
                        saveUser(data.name, data.email, data.role);
                        navigate('/');
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => {
                setLoading(false);
                SetSignupError(error.message);
            })


    }
    const saveUser = (name, email) => {
        setLoading(true);
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
                setLoading(false);
            }).catch(err => {
                setLoading(false);
            })
    }
    if (loading) {
        return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '150px 0px' }}>
            <CircularProgress />
        </Box>
    }
    return (
        <div className=' loginFrom'>
            <div className='LoginFromChild'>
                <h1 style={{ fontSize: '2.25rem', lineHeight: '2.5rem' }}>SignUp</h1>
                <form onSubmit={handleSubmit(handelSignin)}>

                    {/* <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text"
                            {...register("name", { required: "Name is required" })}
                            placeholder="Name" className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-600' role="alert">{errors.name?.message}</p>}
                    </div> */}
                    <TextField
                        type='text'
                        fullWidth
                        {...register("name", { required: "name is required" })}
                        placeholder='Enter Your Name'
                        id="Name"
                        label="Name"
                        variant="outlined"
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                        sx={{ marginBottom: 2 }}
                    />

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
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Chose user type</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={role}
                            onChange={handelChange}
                        >
                            <FormControlLabel value="Buyer" control={<Radio />} label="Buyer" />
                            <FormControlLabel value="Seller" control={<Radio />} label="Seller" />
                            
                        </RadioGroup>
                    </FormControl>
                   
                    <Button type='submit' variant='contained' color='success' fullWidth>SignUp</Button>
                    {signupError && <p className='text-red-600'>{signupError}</p>}
                </form>
                <p style={{ fontSize: "20px" }}>New to the site  ?<Link className='text-primary' to='/login'>Go to Login</Link></p>
            </div>
        </div>
    );
};

export default Signup;