import React, { useState, useEffect } from 'react';
import './ManageScholarships.css';
import {
  AcademicCapIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { scholarshipAPI } from '../../services/api';

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    deadline: '',
    eligibility: '',
    requirements: '',
    benefits: ''
  });

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/university/scholarships', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setScholarships(data);
      }
    } catch (error) {
      console.error('Error fetching scholarships:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = selectedScholarship
        ? `http://localhost:3000/api/university/scholarships/${selectedScholarship._id}`
        : 'http://localhost:3000/api/university/scholarships';
      
      const method = selectedScholarship ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsModalOpen(false);
        setSelectedScholarship(null);
        fetchScholarships();
      }
    } catch (error) {
      console.error('Error saving scholarship:', error);
    }
  };

  const handleDelete = async (scholarshipId) => {
    if (window.confirm('Are you sure you want to delete this scholarship?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/university/scholarships/${scholarshipId}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if (response.ok) {
          fetchScholarships();
        }
      } catch (error) {
        console.error('Error deleting scholarship:', error);
      }
    }
  };

  const openModal = (scholarship = null) => {
    if (scholarship) {
      setSelectedScholarship(scholarship);
      setFormData({
        title: scholarship.title,
        description: scholarship.description,
        amount: scholarship.amount,
        deadline: scholarship.deadline,
        eligibility: scholarship.eligibility,
        requirements: scholarship.requirements,
        benefits: scholarship.benefits
      });
    } else {
      setSelectedScholarship(null);
      setFormData({
        title: '',
        description: '',
        amount: '',
        deadline: '',
        eligibility: '',
        requirements: '',
        benefits: ''
      });
    }
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="scholarships-container">
      <div className="scholarships-header">
        <h1>Manage Scholarships</h1>
        <button 
          className="add-button"
          onClick={() => openModal()}
        >
          Add New Scholarship
        </button>
      </div>

      <div className="scholarships-grid">
        {scholarships.map(scholarship => (
          <div key={scholarship._id} className="scholarship-card">
            <h3>{scholarship.title}</h3>
            <p className="amount">Amount: ₹{scholarship.amount}</p>
            <p className="deadline">Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</p>
            <div className="card-actions">
              <button 
                className="edit-button"
                onClick={() => openModal(scholarship)}
              >
                Edit
              </button>
              <button 
                className="delete-button"
                onClick={() => handleDelete(scholarship._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedScholarship ? 'Edit Scholarship' : 'Add New Scholarship'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Eligibility</label>
                <textarea
                  name="eligibility"
                  value={formData.eligibility}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Requirements</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Benefits</label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarships; 