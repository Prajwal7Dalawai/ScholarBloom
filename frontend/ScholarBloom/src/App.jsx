import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "./ThemeContext"; // Import Theme Context
import "./App.css";
import Home from "./Pages/Home";
import SignupPage from "./Pages/SignupPage.jsx";
import StudentDashboard from "./Pages/StudentDashboard.jsx";
import LoginPage from "./Pages/login.jsx";
import Challenge from "./Pages/Challenge.jsx";
import JobApplication from "./Pages/JobApplication.jsx";
import Header from "./Components/header/Header.jsx";
import Scholarship from "./pages/Scholarship.jsx";
import Course from './Pages/Course.jsx'
import Footer from "./Components/footer/Footer.jsx";
import UniversityDashboard from "./pages/UniversityDashboard";
import ScholarshipApplicants from "./pages/ScholarshipApplicants";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";

import ApplicantProfile from "./pages/ApplicantProfile.jsx";
import JobApplicants from "./pages/JobApplicants.jsx";

import JobApplicationForm from './Pages/JobApplicationForm.jsx'

import ScholarshipApplicationForm from './Pages/ScholarshipApplicationForm.jsx'
import UniProfile from './pages/UniProfile.jsx'
import UniEditProfile from './pages/EditUniversityProfile.jsx'


function App() {
  const { theme, toggleTheme } = useTheme(); // Get theme state and toggle function

  // Apply dark mode to <body>
  useEffect(() => {
    document.body.classList.toggle("dark-mode", theme === "dark");
  }, [theme]);

  return (
    <BrowserRouter>
      <Header className="header" />
      
      {/* Theme Toggle Button (Fixed Floating) */}
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <div className={`main-content`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignupPage />} />
          <Route path="/studentDashboard" element={<StudentDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/jobApplication" element={<JobApplication />} />
          <Route path="/scholarship" element={<Scholarship />} />
          <Route path="/university-dashboard" element={<UniversityDashboard />} />

          <Route path="/scholarship-applicants/:id" element={<ScholarshipApplicants />} />
          <Route path="/studprofile" element={<ProfilePage />} />

          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/uniProfile" element={<UniProfile />} />
          <Route path="/editUniprofile" element={<UniEditProfile />} />
          <Route path="/applicant-profile/:id" element={<ApplicantProfile />} />
        <Route path="/job-applicants/:id" element={<JobApplicants />} />

          <Route path="/courses" element={<Course />} />
          <Route path="/jobApplicationForm" element={<JobApplicationForm />} />
          <Route path="/scholarshipApplicationForm" element={<ScholarshipApplicationForm />} />

        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
