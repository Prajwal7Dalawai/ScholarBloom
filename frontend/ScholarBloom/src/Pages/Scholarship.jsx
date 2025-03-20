import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../Components/ui/Card";
import { Button } from "../Components/ui/Button";
import { data } from "react-router-dom";

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
];

const Scholarship = () => {
  const [applications, setApplications] = useState({});
  const [scholar, setScholar] = useState("");

  useEffect(() => {
    const fetchScholar = async () => {
      const response = await fetch("http://localhost:3000/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setScholar(data);
    };

    fetchScholar();
  }, []);

  const applyForScholarship = (id) => {
    setApplications((prev) => ({ ...prev, [id]: "Applied" }));
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-left">
        Scholarship Portal
      </h1>
      <div> {scholar} </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map((scholarship) => (
          <Card key={scholarship.id} className="p-5 border rounded-lg shadow-lg bg-white">
            <CardContent>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {scholarship.name}
              </h2>
              <p className="text-sm text-gray-600 font-medium mb-3">
                {scholarship.university}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Last Date:</strong> {scholarship.lastDate}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Minimum CGPA:</strong> {scholarship.minCGPA}
              </p>
              <div className="mt-4">
                {applications[scholarship.id] ? (
                  <p className="text-green-600 font-semibold">Status: Applied</p>
                ) : (
                  <Button
                    onClick={() => applyForScholarship(scholarship.id)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
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
