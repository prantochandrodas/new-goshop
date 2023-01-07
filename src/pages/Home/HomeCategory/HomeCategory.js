import React from 'react';
import { Link } from 'react-router-dom';
import './HomeCategory.css';
const HomeCategory = ({category}) => {
    const {name,picture}=category;
    return (
       <Link to={`/product/${category.category_id}`} style={{textDecoration:'none' ,listStyle:'none', color:'black',height:'140px'}}> <div className='homeCategory' >
       <img src={picture}  alt="" />
       <p style={{fontSize:'15px'}}>{name}</p>
   </div></Link>
    );
};

export default HomeCategory;