import React from "react";
import "./ScholarshipCard.css"; // Import CSS file

export default function Coursecard({ course }) {
  return (
    <div className="scholarship-card">
      <img src={course.image} alt={course.title} />
      <div className="content">
        <div className="flex justify-between items-center mb-2">
          <h2>{course.title}</h2>
        </div>
        <p className="info">Instructor: {course.instructor}</p>
        <p className="info">Duration: {course.duration}</p>
        <a href="#" className="apply-btn">Learn</a>
      </div>
    </div>
  );
}
