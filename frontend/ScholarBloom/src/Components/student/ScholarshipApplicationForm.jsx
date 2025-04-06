import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ScholarshipApplicationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();
  const [scholarship, setScholarship] = useState(null);
  const [formData, setFormData] = useState({
    grade: '',
    eligibilityProof: '',
    documents: [],
    statementOfPurpose: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchScholarshipDetails();
  }, [id]);

  const fetchScholarshipDetails = async () => {
    try {
      if (!token) {
        throw new Error('Authentication token not found');
      }

      setLoading(true);
      setError('');
      const response = await fetch(`http://localhost:3000/api/scholarships/${id}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch scholarship details');
      }
      
      const data = await response.json();
      setScholarship(data);
    } catch (error) {
      console.error('Error fetching scholarship details:', error);
      setError(error.message || 'Error fetching scholarship details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const formDataToSend = new FormData();
      formDataToSend.append('grade', formData.grade);
      formDataToSend.append('eligibilityProof', formData.eligibilityProof);
      formDataToSend.append('statementOfPurpose', formData.statementOfPurpose);
      
      formData.documents.forEach(file => {
        formDataToSend.append('documents', file);
      });

      const response = await fetch(`http://localhost:3000/api/student/scholarships/${id}/apply`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }

      navigate('/student/applications');
    } catch (error) {
      console.error('Error submitting application:', error);
      setError(error.message || 'Error submitting application. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !scholarship) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error && !scholarship) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchScholarshipDetails}
          className="mt-2 text-red-600 hover:text-red-700 font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {scholarship ? `Apply for ${scholarship.title}` : 'Loading scholarship details...'}
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {scholarship && (
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Scholarship Details</h2>
          <p><strong>Amount:</strong> ₹{scholarship.amount}</p>
          <p><strong>Deadline:</strong> {new Date(scholarship.deadline).toLocaleDateString()}</p>
          <p><strong>Required EduCoins:</strong> {scholarship.requiredEduCoins}</p>
          <p><strong>Eligibility Criteria:</strong> {scholarship.eligibilityCriteria}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Grade/CGPA
          </label>
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
            required
            placeholder="Enter your current grade or CGPA"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Eligibility Proof
          </label>
          <textarea
            name="eligibilityProof"
            value={formData.eligibilityProof}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
            rows="4"
            required
            placeholder="Explain how you meet the eligibility criteria"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Statement of Purpose
          </label>
          <textarea
            name="statementOfPurpose"
            value={formData.statementOfPurpose}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
            rows="6"
            required
            placeholder="Explain your academic goals and why you deserve this scholarship"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Supporting Documents
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
            accept=".pdf,.doc,.docx"
          />
          <p className="text-sm text-gray-500 mt-1">
            Upload relevant documents (transcripts, certificates, recommendation letters, etc.)
          </p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/student/scholarships')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScholarshipApplicationForm; 