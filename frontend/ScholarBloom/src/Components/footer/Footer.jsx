import React from "react";
import {AiFillFacebook,AiFillInstagram} from "react-icons/ai";
// import {FaSquareXTwitter} from "react-icons/fa";
const Footer = () => {
  return (
    <footer>
        <div className="footer-content bg-dark text-white text-center py-3 mt-auto">
            <p className="mb-0">
                &copy; 2025 <strong>Scholar-Bloom</strong>. All rights reserved.<br/>
                Learn, Earn & Apply.
            </p>
            <div className="social-links">
                <a href=""><AiFillFacebook/></a>
                {/* <a href=""><FaSquareXTwitter/></a> */}
                <a href=""><AiFillInstagram/></a>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
