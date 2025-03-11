import { useState } from "react";
import { Card } from "../Components/ui/Card";
import { Progress } from "../Components/ui/Progress";
import { Trophy, Briefcase, BookOpen } from "lucide-react";

export default function StudentDashboard() {
  const [eduCoins, setEduCoins] = useState(250);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-5xl font-extrabold text-center mb-10">Student Dashboard</h1>

      {/* Top Section */}
      <div className="flex justify-center">
        <EduCoinsCard coins={eduCoins} />
      </div>

  {/* Middle Section - Challenges and Job Roles Side by Side */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 w-full max-w-6xl mx-auto">
  <ChallengesTable />
  <JobRolesTable />
</div>





      {/* Leaderboard Section */}
      <div className="mt-16">
        <LeaderboardTable />
      </div>
    </div>
  );
}

/* -------------------- EduCoins Card Component -------------------- */
function EduCoinsCard({ coins }) {
  return (
    <Card className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition w-80">
      <Trophy size={50} className="text-yellow-500 mx-auto mb-3" />
      <h2 className="text-2xl font-semibold">EduCoins</h2>
      <p className="text-5xl font-bold mt-2">{coins}</p>
    </Card>
  );
}

/* -------------------- Challenges Table Component -------------------- */
function ChallengesTable() {
  const challenges = [
    { id: 1, title: "AI Fundamentals", progress: 70 },
    { id: 2, title: "Data Structures & Algorithms", progress: 40 },
    { id: 3, title: "Machine Learning Basics", progress: 90 },
  ];

  return (
    <Card className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <BookOpen size={28} /> Learning Challenges
      </h2>
      <table className="w-full mt-5 border-collapse">
        <thead>
          <tr className="border-b border-gray-300 text-left">
            <th className="py-3 px-4">Challenge</th>
            <th className="px-4">Progress</th>
          </tr>
        </thead>
        <tbody>
          {challenges.map((challenge) => (
            <tr key={challenge.id} className="border-b border-gray-200">
              <td className="py-3 px-4 font-medium">{challenge.title}</td>
              <td className="px-4">
                <Progress value={challenge.progress} className="h-3 rounded-full" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

/* -------------------- Job Roles Table Component -------------------- */
function JobRolesTable() {
  const jobRoles = [
    { id: 1, title: "Software Engineer Intern", university: "MIT" },
    { id: 2, title: "AI Research Assistant", university: "Stanford" },
    { id: 3, title: "Full Stack Developer", university: "Harvard" },
  ];

  return (
    <Card className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <Briefcase size={28} /> Job Roles
      </h2>
      <table className="w-full mt-5 border-collapse">
        <thead>
          <tr className="border-b border-gray-300 text-left">
            <th className="py-3 px-4">Job Title</th>
            <th className="px-4">University</th>
          </tr>
        </thead>
        <tbody>
          {jobRoles.map((job) => (
            <tr key={job.id} className="border-b border-gray-200">
              <td className="py-3 px-4 font-medium">{job.title}</td>
              <td className="px-4">{job.university}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

/* -------------------- Leaderboard Table Component -------------------- */
function LeaderboardTable() {
  const leaderboard = [
    { rank: 1, name: "Alice Johnson", coins: 1200 },
    { rank: 2, name: "Bob Smith", coins: 1100 },
    { rank: 3, name: "Neha Nayak", coins: 1000 },
  ];

  return (
    <Card className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
      <h2 className="text-4xl font-semibold text-center mb-8">Leaderboard</h2>
      <table className="w-full border-collapse text-lg">
        <thead>
          <tr className="border-b border-gray-300 text-left">
            <th className="py-3 px-4">Rank</th>
            <th className="px-4">Name</th>
            <th className="px-4">EduCoins</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr
              key={entry.rank}
              className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-gray-50" : ""} text-lg`}
            >
              <td className="py-3 px-4">{entry.rank}</td>
              <td className="px-4">{entry.name}</td>
              <td className="px-4 font-bold">{entry.coins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}