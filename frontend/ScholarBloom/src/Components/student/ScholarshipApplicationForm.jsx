import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ScholarshipApplicationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [formData, setFormData] = useState({
    eligibilityProof: '',
    academicTranscript: null,
    recommendationLetter: null,
    statementOfPurpose: '',
    additionalDocuments: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchScholarshipDetails();
  }, [id]);

  const fetchScholarshipDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`http://localhost:3000/scholarships/${id}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
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
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleAdditionalFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      additionalDocuments: [...prev.additionalDocuments, ...files]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('scholarshipId', id);
      formDataToSend.append('eligibilityProof', formData.eligibilityProof);
      formDataToSend.append('statementOfPurpose', formData.statementOfPurpose);
      
      if (formData.academicTranscript) {
        formDataToSend.append('academicTranscript', formData.academicTranscript);
      }
      
      if (formData.recommendationLetter) {
        formDataToSend.append('recommendationLetter', formData.recommendationLetter);
      }
      
      formData.additionalDocuments.forEach(file => {
        formDataToSend.append('additionalDocuments', file);
      });

      const response = await fetch('http://localhost:3000/student/scholarships/apply', {
        method: 'POST',
        credentials: 'include',
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
      <h1 className="text-2xl font-bold mb-6">Apply for {scholarship.title}</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Eligibility Proof
          </label>
          <textarea
            name="eligibilityProof"
            value={formData.eligibilityProof}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="4"
            required
            placeholder="Explain how you meet the eligibility criteria"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Academic Transcript
          </label>
          <input
            type="file"
            name="academicTranscript"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
            accept=".pdf,.doc,.docx"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recommendation Letter
          </label>
          <input
            type="file"
            name="recommendationLetter"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
            accept=".pdf,.doc,.docx"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="6"
            required
            placeholder="Explain your academic goals and why you deserve this scholarship"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Documents
          </label>
          <input
            type="file"
            multiple
            onChange={handleAdditionalFilesChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            accept=".pdf,.doc,.docx"
          />
          <p className="text-sm text-gray-500 mt-1">
            Upload any additional supporting documents (certificates, awards, etc.)
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScholarshipApplicationForm; 