import { useState } from "react";
import { Card } from "../Components/ui/Card";
import { Button } from "../Components/ui/Button";
import Table from "../Components/ui/Table";

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
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-6">AI Challenge Page</h1>
      <p className="text-center text-lg mb-6">Complete AI challenges and earn EduCoins!</p>

      {/* EduCoins Display */}
      <Card className="bg-white p-6 rounded-2xl shadow-lg text-center mb-6">
        <h2 className="text-2xl font-semibold">Your EduCoins</h2>
        <p className="text-5xl font-bold mt-2">{eduCoins}</p>
      </Card>

      {/* Challenges Table */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Challenges</h2>
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
              className={completed[challenge.id] ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}
            >
              {completed[challenge.id] ? "Completed" : "Submit"}
            </Button>,
          ])}
        />
      </div>
    </div>
  );
}
