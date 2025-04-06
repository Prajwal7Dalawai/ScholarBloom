import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
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
    image: harvardImage,
    stats: {
      scholarships: "150+",
      students: "23K+",
      ranking: "#1"
    }
  },
  {
    name: "Stanford University",
    description: "Leading in technology, business, and innovation with a global impact.",
    image: stanford,
    stats: {
      scholarships: "120+",
      students: "17K+",
      ranking: "#2"
    }
  },
  {
    name: "MIT",
    description: "Top-ranked in engineering and technology, pushing the boundaries of knowledge.",
    image: MIT,
    stats: {
      scholarships: "100+",
      students: "11K+",
      ranking: "#3"
    }
  },
];

const UniversitiesSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleLearnMore = () => {
    if (isAuthenticated) {
      navigate('/student/universities');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="section-title text-center mb-8">Top Universities</h2>
      <div className="row">
        {universities.map((uni, index) => (
          <div 
            key={uni.name} 
            className="col-md-4 mb-4" 
            data-aos="fade-up" 
            data-aos-delay={index * 200}
          >
            <div className="university-card shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src={uni.image} 
                  className="card-img-top transform hover:scale-110 transition-all duration-500" 
                  alt={uni.name} 
                />
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                  {uni.stats.ranking} Ranked
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title text-xl font-semibold mb-2">{uni.name}</h5>
                <p className="card-text text-gray-600 mb-4">{uni.description}</p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-primary">{uni.stats.scholarships}</div>
                    <div className="text-sm text-gray-600">Scholarships</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-primary">{uni.stats.students}</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-primary">{uni.stats.ranking}</div>
                    <div className="text-sm text-gray-600">Ranking</div>
                  </div>
                </div>
                <button
                  onClick={handleLearnMore}
                  className="btn btn-primary w-full hover:transform hover:scale-105 transition-all duration-300"
                >
                  {isAuthenticated ? 'View Details' : 'Sign in to View'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversitiesSection;
