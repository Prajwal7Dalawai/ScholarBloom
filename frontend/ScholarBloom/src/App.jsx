import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import SignupPage from './Pages/SignupPage.jsx'
import StudentDashboard from './Pages/StudentDashboard'
import LoginPage from './Pages/login.jsx'
import Challenge from './Pages/Challenge.jsx'
import JobApplication from './Pages/JobApplication.jsx'
import Header from "./Components/header/Header.jsx";
import Scholarship from './Pages/Scholarship.jsx';
import Footer from "./Components/footer/Footer.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header className="header" />
      <div className="main-content">
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignupPage />} />
          <Route path="/studentDashboard" element={<StudentDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/jobApplication" element={<JobApplication />} />
          <Route path="/scholarship" element={<Scholarship />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
