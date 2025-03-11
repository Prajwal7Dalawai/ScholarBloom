import React, { useState } from "react";
import { Card, CardContent } from "../Components/ui/Card";
import { Button } from "../Components/ui/Button";
import { Progress } from "../Components/ui/Progress";

const jobListings = [
  {
    id: 1,
    title: "Research Assistant",
    university: "ABC University",
    requirements: "Minimum GPA 3.5, Python proficiency",
    scholarship: "500 EduCoins",
    status: "Pending",
  },
  {
    id: 2,
    title: "Teaching Assistant",
    university: "XYZ University",
    requirements: "Teaching experience, Java knowledge",
    scholarship: "700 EduCoins",
    status: "Approved",
  },
];

const JobApplication = () => {
  const [applications, setApplications] = useState({});

  const applyForJob = (id) => {
    setApplications((prev) => ({ ...prev, [id]: "Pending" }));
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Job Application Portal
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {jobListings.map((job) => (
          <Card
            key={job.id}
            className="border rounded-lg shadow-md bg-white overflow-hidden"
          >
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {job.title}
              </h2>
              <p className="text-sm text-gray-600 font-medium mb-2">
                {job.university}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Requirements:</strong> {job.requirements}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Scholarship:</strong> {job.scholarship}
              </p>
              <div className="mt-auto">
                {applications[job.id] ? (
                  <div>
                    <p className="text-blue-600 font-semibold">
                      Status: {applications[job.id]}
                    </p>
                    <Progress
                      value={applications[job.id] === "Approved" ? 100 : 50}
                      className="h-2 rounded-full mt-2"
                    />
                  </div>
                ) : (
                  <Button
                    onClick={() => applyForJob(job.id)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                  >
                    Apply with EduCoins
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

export default JobApplication;