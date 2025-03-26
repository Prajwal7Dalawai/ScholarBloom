import { useState } from "react";
import { Card } from "../Components/ui/Card";
import { Button } from "../Components/ui/Button";
import Table from "../Components/ui/Table";
import "./Challenge.css";

export default function Challenge() {
  const [eduCoins, setEduCoins] = useState(250);
  const [completed, setCompleted] = useState({});

  const challenges = [
    { id: 1, title: "AI Basics Quiz", difficulty: "Easy", reward: 50 },
    { id: 2, title: "Neural Networks Exercise", difficulty: "Medium", reward: 100 },
    { id: 3, title: "Deep Learning Coding Task", difficulty: "Hard", reward: 200 },
  ];

  const handleComplete = (id, reward) => {
    if (!completed[id]) {
      setEduCoins(eduCoins + reward);
      setCompleted({ ...completed, [id]: true });
    }
  };

  return (
    <div className="challenge-container">
      <h1 className="challenge-title">AI Challenge Page</h1>
      <p className="challenge-subtitle">Complete AI challenges and earn EduCoins!</p>

      {/* EduCoins Display */}
      <Card className="challenge-card">
        <h2>Your EduCoins</h2>
        <p className="educoins-count">{eduCoins}</p>
      </Card>

      {/* Challenges Table */}
      <div className="challenges-table-container">
        <h2>Challenges</h2>
        <Table
          columns={["Title", "Difficulty", "Reward", "Action"]}
          data={challenges.map((challenge) => [
            challenge.title,
            challenge.difficulty,
            `${challenge.reward} Coins`,
            <Button
              key={challenge.id}
              onClick={() => handleComplete(challenge.id, challenge.reward)}
              disabled={completed[challenge.id]}
              className={completed[challenge.id] ? "challenge-btn-disabled" : "challenge-btn"}
            >
              {completed[challenge.id] ? "Start" : "Submit"}
            </Button>,
          ])}
        />
      </div>
    </div>
  );
}
