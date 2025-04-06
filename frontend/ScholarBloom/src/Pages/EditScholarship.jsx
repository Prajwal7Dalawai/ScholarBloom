import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ScholarshipModal from '../Components/modals/ScholarshipModal';

const EditScholarship = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch(`http://localhost:3000/api/university/scholarships/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch scholarship');
        }

        const data = await response.json();
        setScholarship(data);
      } catch (error) {
        console.error('Error fetching scholarship:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [id, token]);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/university/scholarships/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update scholarship');
      }

      navigate('/university/scholarships');
    } catch (error) {
      console.error('Error updating scholarship:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-16">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 px-4">
      <ScholarshipModal
        isOpen={true}
        onClose={() => navigate('/university/scholarships')}
        scholarship={scholarship}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditScholarship; 