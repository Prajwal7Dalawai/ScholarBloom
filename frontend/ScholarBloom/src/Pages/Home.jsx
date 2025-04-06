import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import CardsSection from "../Components/Home/CardsSection.jsx";
import UniversitiesSection from "../Components/Home/UniversitiesSection.jsx";
import AboutSection from "../pages/About.jsx";
import schoolbanner from "../assets/scholarship-banner.webp";
import { motion } from "framer-motion";
import { AcademicCapIcon, CurrencyDollarIcon, UserGroupIcon, BriefcaseIcon, LightBulbIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
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

  const handleGetStarted = () => {
    if (isAuthenticated) {
      if (user?.role === 'student') {
        navigate('/student/dashboard');
      } else if (user?.role === 'university') {
        navigate('/university/dashboard');
      }
    } else {
      navigate('/login');
    }
  };

  const features = [
    {
      icon: LightBulbIcon,
      title: "Gamified Learning",
      description: "Complete educational challenges and skill-based tasks to earn EduCoins"
    },
    {
      icon: CurrencyDollarIcon,
      title: "EduCoins System",
      description: "Earn and redeem virtual currency for real educational benefits"
    },
    {
      icon: BriefcaseIcon,
      title: "University Jobs",
      description: "Access roles like research assistants and content creators"
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure Wallet",
      description: "Manage your EduCoins securely in your digital wallet"
    }
  ];

  return (
    <div 
      className={`w-full min-h-screen ${
        isLightMode ? "bg-white text-black" : "bg-gradient-to-b from-blue-700 to-black text-white"
      }`}
    >
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full flex items-center py-16"
      >
        <div className="w-full max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <motion.h1 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              >
                Where Financial Opportunities <span className="text-primary">Bloom</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className={`text-lg md:text-xl mb-6 ${isLightMode ? "text-gray-700" : "text-gray-300"}`}
              >
                A gamified platform where students earn scholarships through skills and learning. Make financial aid more engaging and skill-driven.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <button 
                  onClick={handleGetStarted}
                  className="btn btn-primary text-lg px-8 py-3 shadow-lg hover:transform hover:scale-105 transition-all duration-300"
                >
                  {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                </button>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <img 
                src={schoolbanner} 
                alt="Career Growth" 
                className="w-full h-auto rounded-lg shadow-xl hover:transform hover:scale-105 transition-all duration-300" 
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Mission Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`w-full py-16 ${isLightMode ? "bg-gray-50" : "bg-gray-900"}`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className={`text-lg mb-8 ${isLightMode ? "text-gray-600" : "text-gray-300"}`}>
              Education is a fundamental right, but financial hurdles make it hard to access. Unlike traditional platforms that only list scholarships, ScholarBloom empowers students to earn them through active participation and skill development.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`p-6 rounded-lg ${isLightMode ? "bg-white shadow-lg" : "bg-gray-800"}`}
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className={isLightMode ? "text-gray-600" : "text-gray-300"}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`w-full py-12 ${isLightMode ? "bg-gray-100" : "bg-gray-900"}`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className={`p-6 rounded-lg ${isLightMode ? "bg-white shadow-lg" : "bg-gray-800"}`}>
              <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
              <p className={isLightMode ? "text-gray-600" : "text-gray-300"}>Active Scholarships</p>
            </div>
            <div className={`p-6 rounded-lg ${isLightMode ? "bg-white shadow-lg" : "bg-gray-800"}`}>
              <h3 className="text-4xl font-bold text-primary mb-2">1000+</h3>
              <p className={isLightMode ? "text-gray-600" : "text-gray-300"}>Job Opportunities</p>
            </div>
            <div className={`p-6 rounded-lg ${isLightMode ? "bg-white shadow-lg" : "bg-gray-800"}`}>
              <h3 className="text-4xl font-bold text-primary mb-2">50+</h3>
              <p className={isLightMode ? "text-gray-600" : "text-gray-300"}>Partner Universities</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Unique Value Proposition */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full py-16"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose ScholarBloom?</h2>
            <p className={`text-lg mb-8 ${isLightMode ? "text-gray-600" : "text-gray-300"}`}>
              We're the first platform that integrates learning and financial aid into a single ecosystem. Through our AI-powered scholarship matching and real corporate-university partnerships, we create a unique environment where education and opportunity truly bloom.
            </p>
          </div>
        </div>
      </motion.section>

      <section id="opportunities" className="w-full py-16">
        <CardsSection />
      </section>

      <section id="universities" className="w-full py-16">
        <UniversitiesSection />
      </section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`w-full py-16 ${isLightMode ? "bg-gray-100" : "bg-gray-900"}`}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className={`text-lg mb-8 ${isLightMode ? "text-gray-600" : "text-gray-300"}`}>
            Join thousands of students who have already found their path to success through skill-driven opportunities
          </p>
          <button 
            onClick={handleGetStarted}
            className="btn btn-primary text-lg px-8 py-3 shadow-lg hover:transform hover:scale-105 transition-all duration-300"
          >
            {isAuthenticated ? 'View Opportunities' : 'Join Now'}
          </button>
        </div>
      </motion.section>
    </div>
  );
}

export default Home;