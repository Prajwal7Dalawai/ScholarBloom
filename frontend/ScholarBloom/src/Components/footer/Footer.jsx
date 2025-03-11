import React from 'react'
import './Footer.css'
import { AiFillFacebook, AiFillInstagram  } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
        <div className="footer-content">
            <p>
                &copy; 2024 <strong>Edu-Quest</strong>. All rights reserved.<br/>
                Learn, Earn & Apply.
            </p>
            <div className="social-links">
                <a href=""><AiFillFacebook/></a>
                <a href=""><FaSquareXTwitter/></a>
                <a href=""><AiFillInstagram/></a>
            </div>
        </div>
    </footer>
  );
};

export default Footer
