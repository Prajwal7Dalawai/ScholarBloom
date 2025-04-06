import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./ScholarshipCard.css"; // Import CSS file

export default function ScholarshipCard({ scholarship }) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleApply = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const response = await fetch(`http://localhost:3000/api/student/scholarships/${scholarship._id}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to apply for scholarship');
      }

      setSuccess(true);
    } catch (error) {
      console.error('Error applying for scholarship:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scholarship-card">
      <img src={scholarship.image} alt={scholarship.title} className="scholarship-image" />
      <div className="content">
        <div className="flex justify-between items-center mb-2">
          <h2>{scholarship.title}</h2>
          <span className="info">📅 Posted 2 days ago</span>
        </div>
        <p className="info">Amount: ₹{scholarship.amount}</p>
        <p className="info">Last date to apply: {new Date(scholarship.deadline).toLocaleDateString()}</p>
        <p className="info">Required EduCoins: {scholarship.requiredEduCoins}</p>
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
          aria-label={`Apply for ${scholarship.title}`}
        >
          {loading ? 'Applying...' : success ? 'Applied' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
}
