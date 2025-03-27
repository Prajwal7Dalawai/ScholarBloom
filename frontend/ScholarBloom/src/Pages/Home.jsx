import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardsSection from "../Components/Home/CardsSection.jsx";
import UniversitiesSection from "../Components/Home/UniversitiesSection.jsx";
import AboutSection from "./About.jsx";
import schoolbanner from "../assets/scholarship-banner.webp";


const Home = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLightMode(document.body.classList.contains("light-mode"));
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    setIsLightMode(document.body.classList.contains("light-mode"));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`flex flex-col min-h-screen mt-5 pt-5 ${isLightMode ? "bg-white text-black" : "bg-gradient-to-b from-blue-700 to-black text-white"}`}>
      <div className="container flex-grow-1 flex items-center mt-5 pt-5">
        <div className="row align-items-center w-100">
          <div className="col-md-6 md:text-left">
            <h1 className="fw-bold text-5xl md:text-6xl">
              <span className="text-primary">Unlock</span> Your Career{" "}
              <span className={isLightMode ? "text-blue-600" : "text-blue-300"}>Unlock</span> Your Career
            </h1>

            <p className={isLightMode ? "text-gray-700" : "text-gray-300"} mt-3>
              Explore opportunities from across the globe to grow, showcase skills, gain CV points & get hired by your dream company.
            </p>

            <button className="btn btn-primary mt-3 shadow-lg">Get Started</button>
          </div>

          <div className="col-md-6 text-center">
            <img src={schoolbanner} alt="Career Growth" className="img-fluid rounded-lg shadow-xl" />
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
    </div>
  );
};

export default Home;
