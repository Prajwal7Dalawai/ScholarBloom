import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/about.css"; // Import custom styles

const AboutSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="container my-5">
      <div className="row align-items-center">
        {/* Left Side - Image */}
        <div className="col-md-6 text-center">
          <img
            src="/assets/AboutUs.jpeg"
            alt="About Us"
            className="about-img img-fluid rounded shadow-lg"
            data-aos="fade-right"
          />
        </div>

        {/* Right Side - Text */}
        <div className="col-md-6 about-text" data-aos="fade-left">
          <h2 className="fw-bold">About Us</h2>
          <p className="text-muted">
            We provide career growth opportunities by connecting students and professionals with top universities and companies.
          </p>
          <p>
            Our platform offers internships, competitions, and learning experiences to help you build a successful future.
          </p>
          <a href="#" className="btn btn-primary mt-3">Learn More</a>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
