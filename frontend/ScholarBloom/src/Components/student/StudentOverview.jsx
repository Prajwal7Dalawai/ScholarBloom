import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './StudentOverview.css';

const StudentOverview = () => {
  const [scholarships, setScholarships] = useState([]);
  const [educoins, setEduCoins] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scholarshipsResponse, educoinsResponse] = await Promise.all([
          fetch('http://localhost:3000/api/scholarships', { 
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }),
          fetch('http://localhost:3000/api/student/educoins', { 
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
        ]);

        const [scholarshipsData, educoinsData] = await Promise.all([
          scholarshipsResponse.json(),
          educoinsResponse.json()
        ]);

        setScholarships(scholarshipsData);
        setEduCoins(educoinsData.balance || 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="overview-container">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Available Scholarships</h3>
          <p className="stat-value">{scholarships.length}</p>
        </div>
        <div className="stat-card">
          <h3>Available Jobs</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="stat-card">
          <h3>Available Challenges</h3>
          <p className="stat-value">0</p>
        </div>
      </div>

      <div className="educoins-display">
        <p className="educoins-value">{educoins}</p>
        <p className="educoins-label">Total EduCoins Earned</p>
      </div>
    </div>
  );
};

export default StudentOverview; 