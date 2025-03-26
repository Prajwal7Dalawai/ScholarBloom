import React from 'react';
import './Challenge.css'; // Import the CSS file
import GameCard from '../Components/ui/GameCard'; // Import the GameCard component

function Challenge() {
  return (
    <div className="challenge-page-container">
      <div className="intro-section">
        <h2>Earn EduCoins by Testing Your IQ</h2>
        <p>Sharpen your mind and earn rewards with our engaging challenges!</p>
      </div>

      <GameCard
      />

      <div className="coming-soon-section">
        <h2>More Gaming Coming Soon</h2>
        <p>Stay tuned for more exciting challenges to boost your IQ and earn EduCoins!</p>
        <div className="coming-soon-placeholder">
          <span role="img" aria-label="construction">🚧</span> Under Construction <span role="img" aria-label="construction">🚧IP</span>
        </div>
      </div>
    </div>
  );
}

export default Challenge;