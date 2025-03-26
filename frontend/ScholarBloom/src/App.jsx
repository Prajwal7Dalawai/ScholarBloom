import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './App.css'

import SignupPage from './pages/SignupPage.jsx'
import Dashboard from './pages/dashboard.jsx'
import LoginPage from './Pages/login.jsx'
import Challenge from './Pages/Challenge.jsx'
import JobApplication from './Pages/JobApplication.jsx'
import Header from "./Components/header/Header.jsx";

import Scholarship from './pages/Scholarship.jsx';
import Footer from "./Components/footer/Footer.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header className="header" /> 
      <div className="main-content">
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignupPage />} />
          <Route path="/studentDashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/jobApplication" element={<JobApplication />} />
          <Route path="/scholarship" element={<Scholarship />} />
          
        </Routes>
      </div>
      <Footer className="footer" /> 
    </BrowserRouter>
  );
}

export default App;
