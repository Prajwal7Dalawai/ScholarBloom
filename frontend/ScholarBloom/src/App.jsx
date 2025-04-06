import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import StudentLayout from './Components/student/StudentLayout';
import StudentOverview from './Components/student/StudentOverview';
import UniversityDashboard from './Components/university/UniversityDashboard';
import "./App.css";
import SignupPage from "./pages/SignupPage.jsx";
import Challenge from "./pages/Challenge.jsx";
import JobApplication from "./pages/JobApplication.jsx";
import Header from "./Components/header/Header.jsx";
import Scholarship from "./pages/Scholarship.jsx";
import Course from './pages/Course.jsx'
import ScholarshipApplicants from "./pages/ScholarshipApplicants";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ApplicantProfile from "./pages/ApplicantProfile.jsx";
import JobApplicants from "./pages/JobApplicants.jsx";
import JobApplicationForm from './Pages/JobApplicationForm.jsx'
import ScholarshipApplicationForm from './Components/student/ScholarshipApplicationForm'
import UniProfile from './pages/UniProfile.jsx'
import UniEditProfile from './pages/EditUniversityProfile.jsx'
import HostScholarship from "./pages/HostScholarship.jsx";
import HostJob from "./pages/HostJob.jsx";
import About from './pages/About';
import Contact from './pages/Contact';
import SignUp from './pages/SignUp';
import UniversityProfile from './Components/university/UniversityProfile';
import AdminDashboard from './Components/admin/AdminDashboard';
import UserManagement from './Components/admin/UserManagement';
import ContentManagement from './Components/admin/ContentManagement';
import SystemSettings from './Components/admin/SystemSettings';
import StudentProfile from './Components/student/StudentProfile';
import DashboardOverview from './Components/student/DashboardOverview';
import ScholarshipList from './Components/student/ScholarshipList';
import JobList from './Components/student/JobList';
import ChallengeList from './Components/student/ChallengeList';
import MyApplications from './Components/student/MyApplications';
import AIRecommendations from './Components/student/AIRecommendations';
import ManageScholarships from './Components/university/ManageScholarships';
import ManageJobs from './Components/university/ManageJobs';
import ManageChallenges from './Components/university/ManageChallenges';
import ApplicationsList from './Components/university/ApplicationsList';
import ManageUsers from './Components/admin/ManageUsers';
import ManageOrganizations from './Components/admin/ManageOrganizations';
import NotFound from './pages/NotFound';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Sidebar from './Components/Sidebar';
import { useNavigate } from 'react-router-dom';
import CreateChallenge from './pages/CreateChallenge';
import EditScholarship from './pages/EditScholarship';
import EditJob from './pages/EditJob';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Store the attempted URL
      navigate('/login', { 
        replace: true,
        state: { from: location.pathname }
      });
    }
  }, [loading, isAuthenticated, navigate, location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(user?.role))) {
    return null;
  }

  return children;
};

function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.match(/^\/(?:student|university|admin)/);

  return (
    <div className={`min-h-screen ${isDashboardRoute ? 'bg-gray-50' : ''}`}>
      <AuthProvider>
        <ThemeProvider>
          <div className={`${isDashboardRoute ? 'flex' : ''}`}>
            {isDashboardRoute && <Sidebar />}
            <div className={`${isDashboardRoute ? 'flex-1 pl-4 pr-6' : 'w-full'}`}>
              <Navbar />
              <main className={`${isDashboardRoute ? 'p-6' : 'p-0'}`}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  
                  {/* Protected Student Routes */}
                  <Route
                    path="/student/*"
                    element={
                      <ProtectedRoute allowedRoles={['student']}>
                        <StudentLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<StudentOverview />} />
                    <Route path="profile" element={<StudentProfile />} />
                    <Route path="scholarships" element={<ScholarshipList />} />
                    <Route path="scholarships/apply/:id" element={<ScholarshipApplicationForm />} />
                    <Route path="jobs" element={<JobList />} />
                    <Route path="challenges" element={<ChallengeList />} />
                    <Route path="applications" element={<MyApplications />} />
                    <Route path="ai-recommendations" element={<AIRecommendations />} />
                  </Route>

                  {/* Protected University Routes */}
                  <Route
                    path="/university/*"
                    element={
                      <ProtectedRoute allowedRoles={['university']}>
                        <UniversityDashboard />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<UniversityProfile />} />
                    <Route path="scholarships" element={<ManageScholarships />} />
                    <Route path="scholarships/create" element={<HostScholarship />} />
                    <Route path="scholarships/:id/edit" element={<EditScholarship />} />
                    <Route path="jobs" element={<ManageJobs />} />
                    <Route path="jobs/create" element={<HostJob />} />
                    <Route path="jobs/:id/edit" element={<EditJob />} />
                    <Route path="challenges" element={<ManageChallenges />} />
                    <Route path="challenges/create" element={<CreateChallenge />} />
                    <Route path="applications" element={<ApplicationsList />} />
                  </Route>

                  {/* Protected Admin Routes */}
                  <Route
                    path="/admin/*"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<ManageUsers />} />
                    <Route path="organizations" element={<ManageOrganizations />} />
                    <Route path="settings" element={<SystemSettings />} />
                  </Route>

                  {/* Public Routes */}
                  <Route path="/challenge" element={<Challenge />} />
                  <Route path="/jobApplication" element={<JobApplication />} />
                  <Route path="/scholarship" element={<Scholarship />} />
                  <Route path="/courses" element={<Course />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
