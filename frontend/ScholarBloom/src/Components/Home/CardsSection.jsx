import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/CardsSection.css"; // Import custom styles

const CardsSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="container my-5">
      <h2 className="section-title text-center">Explore Opportunities</h2>
      <div className="row">
        {/* Card 1 */}
        <div className="col-md-4" data-aos="fade-up">
          <div className="custom-card shadow-lg">
            <img src="/assets/card1.jpg" className="card-img-top" alt="Internships" />
            <div className="card-body">
              <h5 className="card-title">Internships</h5>
              <p className="card-text">Gain practical experience with top organizations.</p>
              <a href="#" className="btn btn-primary">Explore</a>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
          <div className="custom-card shadow-lg">
            <img src="/assets/card2.jpg" className="card-img-top" alt="Jobs" />
            <div className="card-body">
              <h5 className="card-title">Jobs</h5>
              <p className="card-text">Discover diverse career opportunities worldwide.</p>
              <a href="#" className="btn btn-primary">Explore</a>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-4" data-aos="fade-up" data-aos-delay="400">
          <div className="custom-card shadow-lg">
            <img src="/assets/card3.jpg" className="card-img-top" alt="Competitions" />
            <div className="card-body">
              <h5 className="card-title">Competitions</h5>
              <p className="card-text">Showcase your skills and win exciting rewards.</p>
              <a href="#" className="btn btn-primary">Explore</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsSection;
