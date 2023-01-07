import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Footer.css'
const Footer = () => {
    return (
        <div style={{ marginTop: '50px',background:'#4b5563',color:'white' }}>
            <div style={{padding:'50px 40px'}} className="footer">
                <div>
                    <h3>Pranto</h3>
                   <p style={{display:'flex',alignItems:'center'}}><EmailIcon></EmailIcon> Email :prantochandrodas@gmail.com</p>
                   <p style={{display:'flex',alignItems:'center'}}><LocationOnIcon></LocationOnIcon>Dhaka,Bangladesh</p>
                </div>
                <div>
                    <h3>Social Media</h3>
                    <div>
                        <FacebookIcon></FacebookIcon>
                        <LinkedInIcon></LinkedInIcon>
                        <GitHubIcon></GitHubIcon>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;