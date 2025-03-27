import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardsSection from "../Components/Home/CardsSection.jsx";
import UniversitiesSection from "../Components/Home/UniversitiesSection.jsx";
import AboutSection from "../pages/About.jsx"; // ✅ Corrected Import Path
import schoolbanner from "../assets/scholarship-banner.webp";

const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Hero Section with Image Side by Side */}
      <div className="container flex-grow-1 d-flex align-items-center mt-5 pt-5">
        <div className="row align-items-center w-100">
          {/* Left Side - Text Content */}
          <div className="col-md-6 text-md-left">
            <h1 className="fw-bold">
              <span className="text-primary">Unlock</span> Your Career
            </h1>
            <p className="text-light mt-3">
              Explore opportunities from across the globe to grow, showcase skills, gain CV points & get hired by your dream company.
            </p>
            <button className="btn btn-primary mt-3 shadow-lg">Get Started</button>
          </div>

          {/* Right Side - Image */}
          <div className="col-md-6 text-center">
            <img src={schoolbanner} alt="Career Growth" className="img-fluid rounded-lg shadow-xl" />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div id="about">
        <AboutSection />
      </div>
      <div id="opportunities">
        <CardsSection />
      </div>
      <div id="universities">
        <UniversitiesSection />
      </div>
    </div>
  );
};

export default Home;
