import React from 'react';
import banner from "../../../assets/banner/banner1.jpg";
const HomeBanner = () => {
    return (
        <div style={{marginTop:"90px"}}>
            <img src={banner} style={{maxWidth:"100%"}} alt="" />
        </div>
    );
};

export default HomeBanner;