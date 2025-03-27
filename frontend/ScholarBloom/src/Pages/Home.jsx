import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardsSection from "../Components/Home/CardsSection.jsx";
import UniversitiesSection from "../Components/Home/UniversitiesSection.jsx";
import AboutSection from "./About.jsx";
import schoolbanner from "../assets/scholarship-banner.webp";

const Home = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Check if light mode is active on body
    setIsLightMode(document.body.classList.contains("light-mode"));

    // Listen for class changes on body
    const observer = new MutationObserver(() => {
      setIsLightMode(document.body.classList.contains("light-mode"));
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`flex flex-col min-h-screen mt-5 pt-5 ${isLightMode ? "bg-white text-black" : "bg-gradient-to-b from-blue-700 to-black text-white"}`}>
      
      <div className="container flex-grow-1 flex items-center mt-5 pt-5">
        <div className="row align-items-center w-100">
          {/* Left Side - Hero Text */}
          <div className="col-md-6 md:text-left">
            <h1 className="fw-bold text-5xl md:text-6xl">
              <span className={`${isLightMode ? "text-blue-600" : "text-blue-300"}`}>Unlock</span> Your Career
            </h1>

            <p className={`${isLightMode ? "text-gray-700" : "text-gray-300"} mt-3`}>
              Explore opportunities from across the globe to grow, showcase skills, gain CV points & get hired by your dream company.
            </p>
            
            {/* Button remains the same in both modes */}
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
