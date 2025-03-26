import React from "react";
import "./ScholarshipCard.css"; // Import CSS file
import SimonPoster from "../../assets/simon.png";

export default function GameCard() {
  return (
    <div className="scholarship-card">
      <img src={SimonPoster} alt="Simon Game" />
      <div className="content">
        <div className="flex justify-between items-center mb-2">
          <h2>Simon Game</h2>
          <span className="info">
            Test your memory and pattern recognition with the classic Simon Game.
          </span>
        </div>
        {/* Open Simon Game in a new tab */}
        <a href="/SimonGame/index.html" target="_blank" rel="noopener noreferrer" className="apply-btn">
          Play Now
        </a>

      </div>
    </div>
  );
}
