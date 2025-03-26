import React from "react";
// import Navbar from "../Components/header/Header.jsx";
// import Footer from "../Components/footer/Footer.jsx";
import CardsSection from "../Components/Home/CardsSection.jsx";
import UniversitiesSection from "../Components/Home/UniversitiesSection.jsx";
import AboutSection from "./About.jsx";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">

      {/* <Navbar /> */}

      {/* Hero Section with Image Side by Side */}
      <div className="container flex-grow-1 flex items-center">

        <div className="row align-items-center w-100">
          {/* Left Side - Hero Text */}
          <div className="col-md-6 text-center md:text-left">

            <h1 className="fw-bold">
              <span className="text-primary">Unlock</span> Your Career
            </h1>
            <p className="text-muted">
              Explore opportunities from across the globe to grow, showcase skills, gain CV points & get hired by your dream company.
            </p>
            <button className="btn btn-primary mt-3">Get Started</button>
          </div>

          {/* Right Side - Image */}
          <div className="col-md-6 text-center">
            <img src="/assets/scholarship-banner.webp" alt="Career Growth" className="img-fluid rounded shadow-lg" />
          </div>
        </div>
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="opportunities">
        <CardsSection />
      </div>
      <div id="universities">
        <UniversitiesSection />
      </div>
      
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
