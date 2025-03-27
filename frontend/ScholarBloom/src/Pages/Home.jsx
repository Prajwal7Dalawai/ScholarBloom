import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD

=======
// import Navbar from "../Components/header/Header.jsx";
// import Footer from "../Components/footer/Footer.jsx";
>>>>>>> 194ebaf6ec29eee54f9bbd2737113c8bfac53729
import CardsSection from "../Components/Home/CardsSection.jsx";
import UniversitiesSection from "../Components/Home/UniversitiesSection.jsx";
import AboutSection from "./About.jsx";
import schoolbanner from "../assets/scholarship-banner.webp";

const Home = () => {
  return (
<<<<<<< HEAD
    <div className="flex flex-col min-h-screen mt-5 pt-5"> {/* Combines margin and padding */}
=======
    
    <div className="flex flex-col min-h-screen">

      {/* <Navbar /> */}
     

      {/* Hero Section with Image Side by Side */}
      <div className="container flex-grow-1 flex items-center">
>>>>>>> 194ebaf6ec29eee54f9bbd2737113c8bfac53729

    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-700 to-black text-white">
      <div className="container flex-grow-1 flex items-center mt-5 pt-5">
        <div className="row align-items-center w-100">
<<<<<<< HEAD
          {/* Left Side - Hero Text */}
          <div className="col-md-6 md:text-left">
            <h1 className="fw-bold text-5xl md:text-6xl">
              <span className="text-blue-400">Unlock</span> Your Career
=======
          <div className="col-md-6  md:text-left">


            <h1 className="fw-bold">
              <span className="text-primary">Unlock</span> Your Career
>>>>>>> 194ebaf6ec29eee54f9bbd2737113c8bfac53729
            </h1>
            <p className="text-gray-300 mt-3">
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
    </div>
  );
};

export default Home;