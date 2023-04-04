import React from 'react';
import banner from "../../../assets/banner/banner1.jpg";
import banner2 from "../../../assets/banner/banner2.jpg";
import banner3 from "../../../assets/banner/banner3.jpg";
import banner4 from "../../../assets/banner/banner4.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomeBanner.css';
import { NavLink } from 'react-router-dom';
import NavbarSearch from '../../NavbarSearch/NavbarSearch';
const HomeBanner = () => {


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
    };
    return (
        <div>
            <Slider {...settings} className="carousel">
                <div>
                    <NavLink style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: "500", fontSize: "15px" }} to='/AllProduct'> <img src={banner} height="100%" style={{ width: '100%' }} alt="" /></NavLink>
                </div>
                <div>
                    <NavLink style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: "500", fontSize: "15px" }} to='/AllProduct'> <img src={banner2} height="100%" style={{ width: '100%' }} alt="" /></NavLink>
                </div>
                <div>
                    <NavLink style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: "500", fontSize: "15px" }} to='/AllProduct'> <img src={banner3} height="100%" style={{ width: '100%' }} alt="" /></NavLink>
                </div>
                <div>
                    <NavLink style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: "500", fontSize: "15px" }} to='/AllProduct'> <img src={banner4} height="100%" style={{ width: '100%' }} alt="" /></NavLink>
                </div>
                <div>
                    <NavLink style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: "500", fontSize: "15px" }} to='/AllProduct'> <img src={banner} height="100%" style={{ width: '100%' }} alt="" /></NavLink>
                </div>
                <div>
                    <NavLink style={{ color: 'black', listStyle: "none", textDecoration: "none", marginLeft: '20px', fontWeight: "500", fontSize: "15px" }} to='/AllProduct'> <img src={banner2} height="100%" style={{ width: '100%' }} alt="" /></NavLink>
                </div>
            </Slider> 
        </div>
    );
};

export default HomeBanner;