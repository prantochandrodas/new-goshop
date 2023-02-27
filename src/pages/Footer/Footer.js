import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import logo from '../../assets/logo2.png';
import './Footer.css'
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div>
            <footer class="padding_4x">
                <div class="flex">

                    <section class="flex-content padding_1x">
                        <h3>Quick Links</h3>
                        <Link style={{listStyle:"none", textDecoration:"none",fontWeight:"500",fontSize:"15px"}}  to='/'> Home</Link>
                        <Link style={{listStyle:"none", textDecoration:"none",fontWeight:"500",fontSize:"15px"}}  to='/MyOrders'> MyOrders</Link>
                        <Link style={{listStyle:"none", textDecoration:"none",fontWeight:"500",fontSize:"15px"}}  to='/WatchLater'> WatchLater</Link>
                    </section>
                    <section class="flex-content padding_1x">
                        <h3>Features</h3>
                        <p>Authentication System</p>
                        <p>Add Product</p>
                        <p>Place order</p>
                        <p>Watch Later</p>
                    </section>
                    <section class="flex-content padding_1x">
                        <h3>Technology</h3>
                        <p>React</p>
                        <p>Material ui</p>
                        <p>Express</p>
                        <p>MongoDB</p>
                    </section>
                    <section class="flex-content padding_1x">
                        <h3>Social Media</h3>
                        <p>Contact us on:-</p>
                        <a href="https://www.facebook.com/pranto.chandrodas.33/" style={{display:'inline-block'}} target='_blank'> <FacebookIcon sx={{ color: 'white', margin: '0px 5px' }}></FacebookIcon></a>
                        <a href="https://www.linkedin.com/in/pranto-das08/" style={{display:'inline-block'}} target='_blank'><LinkedInIcon sx={{ color: 'white' }}></LinkedInIcon></a>
                        <a href="https://www.instagram.com/prantochandro/" style={{display:'inline-block'}} target='_blank'> <InstagramIcon sx={{ color: 'white', margin: '0px 5px' }}></InstagramIcon></a>
                    </section>
                </div>
                <div class="flex">
                    <section class="flex-content padding_1x">
                        <p>Copyright ©2023 All rights reserved || GOSHOP</p>
                    </section>
                </div>
            </footer>
        </div>
    );
};

export default Footer;