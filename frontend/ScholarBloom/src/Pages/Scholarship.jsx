<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../Components/ui/Card";
import { Button } from "../Components/ui/Button";
import "./Scholarship.css"; // Import the CSS file
=======
import React, { useState } from "react";
import ScholarshipCard from "../Components/ui/ScholarshipCard"; // Import the new component
import "./Scholarship.css"; // Import CSS for page layout
import harvardImage from "../assets/ScholarshipPhotos/harward.png";
import MIT from "../assets/ScholarshipPhotos/MIT.png"
import Oxford from "../assets/ScholarshipPhotos/oxford.png"
import stanford from "../assets/ScholarshipPhotos/stanford.png"
import Caltech from "../assets/ScholarshipPhotos/caltech.png"
import cambridge from "../assets/ScholarshipPhotos/cambridge.png"

>>>>>>> 365634116a533ed8e09b6a228c77375b0f909db9

const scholarships = [
  { 
    id: 1, 
    name: "Merit-Based Scholarship", 
    university: "Harvard University", 
    lastDate: "March 31, 2025", 
    minCGPA: 3.8, 
    image: harvardImage
  },
  { 
    id: 2, 
    name: "Global Leaders Scholarship", 
    university: "University of Oxford", 
    lastDate: "May 10, 2025", 
    minCGPA: 3.7, 
    image: Oxford
  },
  { 
    id: 3, 
    name: "AI Research Grant", 
    university: "Stanford University", 
    lastDate: "June 5, 2025", 
    minCGPA: 3.6, 
    image: stanford
  },
  { 
    id: 4, 
    name: "Future Scientists Fund", 
    university: "University of Cambridge", 
    lastDate: "August 20, 2025", 
    minCGPA: 3.85, 
    image: cambridge
  },
  { 
    id: 5, 
    name: "Tech Innovators Award", 
    university: "California Institute of Technology (Caltech)", 
    lastDate: "July 1, 2025", 
    minCGPA: 3.9, 
    image: Caltech
  },
  
  { 
    id: 6, 
    name: "STEM Excellence Scholarship", 
    university: "Massachusetts Institute of Technology (MIT)", 
    lastDate: "April 15, 2025", 
    minCGPA: 3.5, 
    image: MIT
  },
];

const Scholarship = () => {
  const [appliedScholarships, setAppliedScholarships] = useState([]);

  const applyForScholarship = (id) => {
    if (!appliedScholarships.includes(id)) {
      setAppliedScholarships([...appliedScholarships, id]);
    }
  };

  return (
    <div className="scholarship-container">
      <h1 className="scholarship-title">Scholarship & Internship Portal</h1>
      <div className="scholarship-grid">
        {scholarships.map((scholarship) => (
          <ScholarshipCard
            key={scholarship.id}
            scholarship={scholarship}
            appliedScholarships={appliedScholarships}
            applyForScholarship={applyForScholarship}
          />
        ))}
      </div>
    </div>
  );
};

export default Scholarship;
