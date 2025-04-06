import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";
import "./CardsSection.css"; // Import custom styles

import job from '../../assets/job.jpeg'
import internship from '../../assets/internship.jpeg'
import challenge from '../../assets/challenge.jpeg'

const opportunities = [
  {
    title: "Scholarships",
    description: "Access financial support and educational opportunities.",
    image: internship,
    path: "/student/scholarships",
    stats: "500+ Active"
  },
  {
    title: "Jobs",
    description: "Discover diverse career opportunities worldwide.",
    image: job,
    path: "/student/jobs",
    stats: "1000+ Openings"
  },
  {
    title: "Challenges",
    description: "Showcase your skills and win exciting rewards.",
    image: challenge,
    path: "/student/challenges",
    stats: "50+ Active"
  }
];

const CardsSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleExplore = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="section-title text-center mb-8">Explore Opportunities</h2>
      <div className="row">
        {opportunities.map((opportunity, index) => (
          <div 
            key={opportunity.title} 
            className="col-md-4 mb-4" 
            data-aos="fade-up" 
            data-aos-delay={index * 200}
          >
            <div className="custom-card shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src={opportunity.image} 
                  className="card-img-top transform hover:scale-110 transition-all duration-500" 
                  alt={opportunity.title} 
                />
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                  {opportunity.stats}
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title text-xl font-semibold mb-2">{opportunity.title}</h5>
                <p className="card-text text-gray-600 mb-4">{opportunity.description}</p>
                <button
                  onClick={() => handleExplore(opportunity.path)}
                  className="btn btn-primary w-full hover:transform hover:scale-105 transition-all duration-300"
                >
                  {isAuthenticated ? 'Explore Now' : 'Sign in to Explore'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsSection;
