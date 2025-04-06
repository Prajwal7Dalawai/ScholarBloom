import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./ScholarshipCard.css";

export default function JobCard({ job }) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleApply = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const response = await fetch(`http://localhost:3000/api/student/jobs/${job._id}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to apply for job');
      }

      setSuccess(true);
    } catch (error) {
      console.error('Error applying for job:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scholarship-card">
      <img src={job.image} alt={job.title} className="job-image" />
      <div className="content">
        <div className="flex justify-between items-center mb-2">
          <h2 className="job-title">{job.title}</h2>
          <span className="info">📅 Posted 2 days ago</span>
        </div>
        <p className="info"><strong>Description:</strong> {job.jobDescription}</p>
        <p className="info"><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
        <p className="info"><strong>Status:</strong> {job.status}</p>
        {error && (
          <p className="text-red-600 text-sm mt-2">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm mt-2">Successfully applied!</p>
        )}
        <button 
          onClick={handleApply} 
          disabled={loading || success}
          className={`apply-btn ${loading || success ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label={`Apply for ${job.title}`}
        >
          {loading ? 'Applying...' : success ? 'Applied' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
}
