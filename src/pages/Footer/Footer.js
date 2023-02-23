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
const Footer = () => {
    return (
        <div>
            <footer class="padding_4x">
                <div class="flex">
                    
                    <section class="flex-content padding_1x">
                        <h3>Quick Links</h3>
                        <a href="#">Jobs</a>
                        <a href="#">Brand Assets</a>
                        <a href="#">Investor Relations</a>
                        <a href="#">Terms of Service</a>
                    </section>
                    <section class="flex-content padding_1x">
                        <h3>Features</h3>
                        <a href="#">Jobs</a>
                        <a href="#">Brand Assets</a>
                        <a href="#">Investor Relations</a>
                        <a href="#">Terms of Service</a>
                    </section>
                    <section class="flex-content padding_1x">
                        <h3>Resources</h3>
                        <a href="#">Guides</a>
                        <a href="#">Research</a>
                        <a href="#">Experts</a>
                        <a href="#">Agencies</a>
                    </section>
                    <section class="flex-content padding_1x">
                        <h3>Social Media</h3>
                        <p>Contact us on:-</p>
                        <FacebookIcon sx={{color:'white', margin:'0px 5px'}}></FacebookIcon>
                        <LinkedInIcon sx={{color:'white'}}></LinkedInIcon>
                        <InstagramIcon sx={{color:'white',margin:'0px 5px'}}></InstagramIcon>
                    </section>
                </div>
                <div class="flex">
                    <section class="flex-content padding_1x">
                        <p>Copyright ©2023 All rights reserved || website name</p>
                    </section>
                    <section class="flex-content padding_1x">
                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-dribbble"></i></a>
                        <a href="#"><i class="fa fa-linkedin"></i></a>
                    </section>
                </div>
            </footer>
        </div>
    );
};

export default Footer;