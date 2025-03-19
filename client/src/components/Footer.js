import React from "react";
import {  FaTwitter, FaInstagram, FaLinkedin,  FaGithub } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* SEO Optimization */}
     

      <div className="social-icons">
        <a href="https://github.com/nomanqadri34" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        <a href="https://x.com/nomanqadri34" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        <a href="https://www.instagram.com/noman_qadri_" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://www.linkedin.com/in/mohd-noman-qadri-6937721b6/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
    
      </div>
      
      <p>Copyright © 2025 Al Qadri. All Rights Reserved</p>
    </footer>
  );
};

export default Footer;

