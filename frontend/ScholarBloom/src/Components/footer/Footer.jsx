import React from "react";

const Footer = () => {
  return (
    <footer>
        <div className="footer-content">
            <p>
                &copy; 2025 <strong>Scholar-Bloom</strong>. All rights reserved.<br/>
                Learn, Earn & Apply.
            </p>
            <div className="social-links">
                <a href=""><AiFillFacebook/></a>
                <a href=""><FaSquareXTwitter/></a>
                <a href=""><AiFillInstagram/></a>
            </div>
        </div>
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <p className="mb-0">© 2025 My Website. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
