import React, { useState, useEffect } from 'react';
import './AIRecommendations.css';
import {
  SparklesIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  LightBulbIcon,
  ArrowPathIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/student/recommendations', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setRecommendations(data);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const filteredRecommendations = selectedCategory === 'all'
    ? recommendations
    : recommendations.filter(rec => rec.type === selectedCategory);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="recommendations-container">
      <h2>AI ಸಲಹೆಗಳು</h2>
      
      <div className="recommendations-grid">
        {filteredRecommendations.map((recommendation, index) => (
          <div key={index} className="recommendation-card">
            <h3>{recommendation.title}</h3>
            <p>{recommendation.description}</p>
            <div className="recommendation-meta">
              <span className="type">{recommendation.type === 'scholarship' ? 'ವಿದ್ಯಾರ್ಥಿವೇತನ' :
               recommendation.type === 'job' ? 'ಉದ್ಯೋಗ' : 'ಸವಾಲು'}</span>
              <span className="score">ಸ್ಕೋರ್: {recommendation.matchScore}%</span>
            </div>
            <div className="recommendation-actions">
              <button className="view-btn">ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ</button>
              <button className="apply-btn">ಅರ್ಜಿ ಸಲ್ಲಿಸಿ</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations; 