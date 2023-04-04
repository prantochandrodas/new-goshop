import { Button, TextField } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './NavbarSearch.css';
const NavbarSearch = () => {
  const handelSubmit=(e)=>{
   const event= e.preventDefault();
   const search=event.search.value;
   console.log(search);
  }
    return (
        <form onSubmit={handelSubmit} className='search'>
                 <TextField name='search' className='search_field' id="outlined-basic" label="Search" sx={{outline:'none'}} variant="outlined" />
                <Button className='search_btn' variant="contained" type="submit"><SearchIcon></SearchIcon>Search</Button>
           </form>
    );
};

export default NavbarSearch;