import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./UniversitiesSection.css"; // Import custom styles

import harvardImage from "../../assets/ScholarshipPhotos/harward.png";
import MIT from "../../assets/ScholarshipPhotos/MIT.png"
import stanford from "../../assets/ScholarshipPhotos/stanford.png"

const universities = [
  {
    name: "Harvard University",
    description: "A world-renowned university known for excellence in education and research.",
    image:harvardImage,
  },
  {
    name: "Stanford University",
    description: "Leading in technology, business, and innovation with a global impact.",
    image: stanford,
  },
  {
    name: "MIT",
    description: "Top-ranked in engineering and technology, pushing the boundaries of knowledge.",
    image: MIT,
  },
];

const UniversitiesSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="container my-5">
      <h2 className="section-title text-center">Top Universities</h2>
      <div className="row">
        {universities.map((uni, index) => (
          <div key={index} className="col-md-4" data-aos="fade-up">
            <div className="university-card shadow-lg">
              <img src={uni.image} className="card-img-top" alt={uni.name} />
              <div className="card-body">
                <h5 className="card-title">{uni.name}</h5>
                <p className="card-text">{uni.description}</p>
                <a href="#" className="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversitiesSection;
