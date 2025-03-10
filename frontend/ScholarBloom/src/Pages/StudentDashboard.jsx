import { useState } from "react";
import { Card, CardContent } from "../Components/ui/Card";
import { Progress } from "../Components/ui/Progress";
import { Button } from "../Components/ui/Button";
import { Trophy, Briefcase, BookOpen } from "lucide-react";

export default function StudentDashboard() {
  const [eduCoins, setEduCoins] = useState(250);
  const challenges = [
    { id: 1, title: "AI Fundamentals", progress: 70 },
    { id: 2, title: "Data Structures & Algorithms", progress: 40 },
    { id: 3, title: "Machine Learning Basics", progress: 90 },
  ];

  const jobRoles = [
    { id: 1, title: "Software Engineer Intern", university: "MIT" },
    { id: 2, title: "AI Research Assistant", university: "Stanford" },
    { id: 3, title: "Full Stack Developer", university: "Harvard" },
  ];

  const leaderboard = [
    { rank: 1, name: "Alice Johnson", coins: 1200 },
    { rank: 2, name: "Bob Smith", coins: 1100 },
    { rank: 3, name: "Neha Nayak", coins: 1000 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Student Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* EduCoins Card */}
        <Card className="bg-gray-800 p-4 flex flex-col items-center">
          <Trophy size={40} className="text-yellow-400 mb-2" />
          <h2 className="text-xl font-semibold">EduCoins</h2>
          <p className="text-3xl font-bold mt-2">{eduCoins}</p>
        </Card>

        {/* Learning Challenges */}
        <Card className="bg-gray-800 p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BookOpen size={24} /> Learning Challenges
          </h2>
          <div className="mt-4 space-y-3">
            {challenges.map((challenge) => (
              <div key={challenge.id}>
                <p className="font-medium">{challenge.title}</p>
                <Progress value={challenge.progress} className="mt-1" />
              </div>
            ))}
          </div>
        </Card>

        {/* Job Roles */}
        <Card className="bg-gray-800 p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Briefcase size={24} /> Job Roles
          </h2>
          <ul className="mt-4 space-y-2">
            {jobRoles.map((job) => (
              <li key={job.id} className="border-b border-gray-700 pb-2">
                <p className="font-medium">{job.title}</p>
                <p className="text-gray-400 text-sm">{job.university}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Leaderboard (Optional) */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Leaderboard</h2>
        <div className="bg-gray-800 p-4 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="py-2">Rank</th>
                <th>Name</th>
                <th>EduCoins</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry.rank} className="border-b border-gray-700">
                  <td className="py-2">{entry.rank}</td>
                  <td>{entry.name}</td>
                  <td>{entry.coins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
