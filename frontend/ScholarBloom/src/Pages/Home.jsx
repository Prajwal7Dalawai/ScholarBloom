import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardsSection from "../Components/Home/CardsSection.jsx";
import UniversitiesSection from "../Components/Home/UniversitiesSection.jsx";
import AboutSection from "../pages/About.jsx"; // ✅ Corrected Import Path
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
    <div 
      className={`w-full min-h-screen ${
        isLightMode ? "bg-white text-black" : "bg-gradient-to-b from-blue-700 to-black text-white"
      }`}
    >
      <div className="w-full flex items-center py-16">
        <div className="w-full max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span className="text-primary">Unlock</span> Your Career
              </h1>
              <p className={`text-lg md:text-xl mb-6 ${isLightMode ? "text-gray-700" : "text-gray-300"}`}>
                Explore opportunities from across the globe to grow, showcase skills, gain CV points & get hired by your dream company.
              </p>
              <button className="btn btn-primary text-lg px-8 py-3 shadow-lg hover:transform hover:scale-105 transition-all duration-300">
                Get Started
              </button>
            </div>
            <div className="w-full md:w-1/2">
              <img 
                src={schoolbanner} 
                alt="Career Growth" 
                className="w-full h-auto rounded-lg shadow-xl hover:transform hover:scale-105 transition-all duration-300" 
              />
            </div>
          </div>
        </div>
      </div>

      <section id="about" className="w-full py-16">
        <AboutSection />
      </section>

      <section id="opportunities" className="w-full py-16">
        <CardsSection />
      </section>

      <section id="universities" className="w-full py-16">
        <UniversitiesSection />
      </section>
    </div>
  );
}

export default Home