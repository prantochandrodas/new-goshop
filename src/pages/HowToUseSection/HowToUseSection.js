import React from 'react';
import image1 from '../../assets/ecommerce.png'
import image2 from '../../assets/frame-2666.png'
import image3 from '../../assets/cash-back.png'
import './HowToUseSection.css'
const HowToUseSection = () => {
    return (
        <div className='HowToUse' data-aos="fade-right"
        data-aos-duration="1000">
            <h2 style={{textAlign:'center'}}>How it works</h2>
            <div className='main_div'>
                <div className='child_div' width="33%">
                    <h3>Join</h3>
                    <p>Sign up for a free account in less than <span className='brake'><br /> </span> 30 seconds.</p>
                    <img src={image1} alt="" />
                </div>
                <div className='child_div' width="33%">
                    <h3>Shop</h3>
                    <p>Start shopping on rakuten.com, the <span className='brake'><br /> </span> Rakuten App or our extension.</p>
                    <img src={image2} alt="" />
                </div>
                <div className='child_div' width="33%">
                    <h3>Get Paid</h3>
                    <p>Watch your Cash Back balance grow, <span className='brake'><br /> </span> then get paid via check or PayPal.</p>
                    <img src={image3} alt="" />
                </div>
            </div>
        </div>
    );
};

export default HowToUseSection;