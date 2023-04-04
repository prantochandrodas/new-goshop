import React from 'react';
import image from '../../assets/asset3-1600x800.png';
import image1 from '../../assets/asset4-1600x800.png';
import './About.css'
const About = () => {
    return (
        <div>
            <div className='About' >

                <div className='About_first_child' data-aos="zoom-in"
        data-aos-duration="1000">
                    <img src={image} alt="" width='600' />
                    <div className='About_child'>
                        <h2>More for you, all with Cash Back</h2>
                        <p>Earn on everything from clothes and electronics, <br /> to restaurants and ride-sharing. We’ll find you <br /> deals on more brands, apps and services so you</p>
                    </div>
                </div>
                <div className='About_second_child' dir='rtl' data-aos="zoom-in"
        data-aos-duration="1000">
                    <img dir='ltr' src={image1} alt="" width='600' />
                    <div className='About_child' dir='ltr'>
                        <h2>Shop whenever you want,<br /> however you want</h2>
                        <p>Shopping smarter doesn’t have to be harder. <br /> Start with Rakuten via desktop, the App or our <br /> extension and let us do the deal-finding for you.</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default About;