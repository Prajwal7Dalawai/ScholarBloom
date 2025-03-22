import { useState } from "react";
import { Card } from "../Components/ui/Card";
import { Progress } from "../Components/ui/Progress";
import { Trophy, Briefcase, BookOpen, User } from "lucide-react";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  const [eduCoins, setEduCoins] = useState(250);
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    courses: ["AI Fundamentals", "Web Development", "Data Science"]
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Student Dashboard</h1>
      
      <div className="top-section">
        <div className="cards-wrapper">
          <EduCoinsCard coins={eduCoins} />
          <UserDetailsCard user={user} />
          <EnrolledCoursesCard courses={user.courses} />
        </div>
      </div>

      <div className="middle-section">
        <ChallengesTable />
        <JobRolesTable />
      </div>
    </div>
  );
}

function EduCoinsCard({ coins }) {
  return (
    <Card className="edu-coins-card">
      <Trophy size={50} className="edu-coins-icon" />
      <h2 className="card-title">EduCoins</h2>
      <p className="coins-amount">{coins}</p>
    </Card>
  );
}

function UserDetailsCard({ user }) {
  return (
    <Card className="user-details-card">
      <User size={50} className="user-icon" />
      <h2 className="card-title">User Details</h2>
      <p className="user-name">{user.name}</p>
      <p className="user-email">{user.email}</p>
    </Card>
  );
}

function EnrolledCoursesCard({ courses }) {
  return (
    <Card className="enrolled-courses-card">
      <BookOpen size={50} className="courses-icon" />
      <h2 className="card-title">Enrolled Courses</h2>
      <ul className="courses-list">
        {courses.map((course, index) => (
          <li key={index} className="course-item">• {course}</li>
        ))}
      </ul>
    </Card>
  );
}

function ChallengesTable() {
  const challenges = [
    { id: 1, title: "AI Fundamentals", progress: 70 },
    { id: 2, title: "Data Structures & Algorithms", progress: 40 },
    { id: 3, title: "Machine Learning Basics", progress: 90 },
  ];

  return (
    <Card className="challenges-table">
      <h2 className="card-title">📗 Learning Challenge 📗</h2>
      <table>
        <thead>
          <tr>
            <th>Challenge</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {challenges.map((challenge) => (
            <tr key={challenge.id}>
              <td>{challenge.title}</td>
              <td><Progress value={challenge.progress} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

function JobRolesTable() {
  const jobRoles = [
    { id: 1, title: "Software Engineer Intern", university: "MIT" },
    { id: 2, title: "AI Research Assistant", university: "Stanford" },
    { id: 3, title: "Full Stack Developer", university: "Harvard" },
  ];

  return (
    <Card className="job-roles-table">
      <h2 className="card-title"> 💻 Internship Role 💻 </h2>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>University</th>
          </tr>
        </thead>
        <tbody>
          {jobRoles.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.university}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
