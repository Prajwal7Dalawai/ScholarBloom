import React, { useState } from "react";
import { Card, CardContent } from "../Components/ui/Card";
import { Button } from "../Components/ui/Button";
import "./Scholarship.css"; // Import the CSS file

const scholarships = [
  {
    id: 1,
    name: "Merit-Based Scholarship",
    university: "ABC University",
    lastDate: "March 31, 2025",
    minCGPA: 3.8,
    status: "Open",
  },
  {
    id: 2,
    name: "STEM Excellence Scholarship",
    university: "XYZ University",
    lastDate: "April 15, 2025",
    minCGPA: 3.5,
    status: "Open",
  },
  {
    id: 3,
    name: "Global Leaders Scholarship",
    university: "Harvard University",
    lastDate: "May 10, 2025",
    minCGPA: 3.7,
    status: "Open",
  },
  {
    id: 4,
    name: "AI Research Grant",
    university: "Stanford University",
    lastDate: "June 5, 2025",
    minCGPA: 3.6,
    status: "Open",
  },
  {
    id: 5,
    name: "Tech Innovators Award",
    university: "MIT",
    lastDate: "July 1, 2025",
    minCGPA: 3.9,
    status: "Open",
  },
  {
    id: 6,
    name: "Future Scientists Fund",
    university: "Cambridge University",
    lastDate: "August 20, 2025",
    minCGPA: 3.85,
    status: "Open",
  },
];

const Scholarship = () => {
  const [applications, setApplications] = useState({});

  const applyForScholarship = (id) => {
    setApplications((prev) => ({ ...prev, [id]: "Applied" }));
  };

  return (
    <div className="scholarship-container">
      <h1 className="scholarship-title">Scholarship & Internship Portal</h1>
      <div className="scholarship-flex">
        {scholarships.map((scholarship) => (
          <Card key={scholarship.id} className="scholarship-card">
            <CardContent>
              <div className="scholarship-header">
                <h2 className="scholarship-name">{scholarship.name}</h2>
                <p className="scholarship-university">{scholarship.university}</p>
                <p>
                  <strong>Last Date:</strong> {scholarship.lastDate}
                </p>
                <p>
                  <strong>Min CGPA:</strong> {scholarship.minCGPA}
                </p>
              </div>



              {/* Apply Button */}
              <div className="sc-apply-button">
                {applications[scholarship.id] ? (
                  <p className="applied-status">Status: Applied</p>
                ) : (
                  <Button
                    onClick={() => applyForScholarship(scholarship.id)}
                    className="sc-apply-now-btn"
                  >
                    Apply Now
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Scholarship;
