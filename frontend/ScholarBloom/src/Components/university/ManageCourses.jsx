import React, { useState, useEffect } from 'react';
import './ManageCourses.css';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    fees: '',
    startDate: '',
    endDate: '',
    prerequisites: '',
    syllabus: '',
    faculty: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/university/courses', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
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
      const url = selectedCourse
        ? `http://localhost:3000/api/university/courses/${selectedCourse._id}`
        : 'http://localhost:3000/api/university/courses';
      
      const method = selectedCourse ? 'PUT' : 'POST';
      
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
        setSelectedCourse(null);
        fetchCourses();
      }
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/university/courses/${courseId}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if (response.ok) {
          fetchCourses();
        }
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const openModal = (course = null) => {
    if (course) {
      setSelectedCourse(course);
      setFormData({
        title: course.title,
        description: course.description,
        duration: course.duration,
        fees: course.fees,
        startDate: course.startDate,
        endDate: course.endDate,
        prerequisites: course.prerequisites,
        syllabus: course.syllabus,
        faculty: course.faculty
      });
    } else {
      setSelectedCourse(null);
      setFormData({
        title: '',
        description: '',
        duration: '',
        fees: '',
        startDate: '',
        endDate: '',
        prerequisites: '',
        syllabus: '',
        faculty: ''
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
    <div className="courses-container">
      <div className="courses-header">
        <h1>Manage Courses</h1>
        <button 
          className="add-button"
          onClick={() => openModal()}
        >
          Add New Course
        </button>
      </div>

      <div className="courses-grid">
        {courses.map(course => (
          <div key={course._id} className="course-card">
            <h3>{course.title}</h3>
            <p className="duration">Duration: {course.duration} months</p>
            <p className="fees">Fees: ₹{course.fees}</p>
            <div className="card-actions">
              <button 
                className="edit-button"
                onClick={() => openModal(course)}
              >
                Edit
              </button>
              <button 
                className="delete-button"
                onClick={() => handleDelete(course._id)}
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
            <h2>{selectedCourse ? 'Edit Course' : 'Add New Course'}</h2>
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
                <label>Duration (months)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Fees</label>
                <input
                  type="number"
                  name="fees"
                  value={formData.fees}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Prerequisites</label>
                <textarea
                  name="prerequisites"
                  value={formData.prerequisites}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Syllabus</label>
                <textarea
                  name="syllabus"
                  value={formData.syllabus}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Faculty</label>
                <textarea
                  name="faculty"
                  value={formData.faculty}
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

export default ManageCourses; 