import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import SignupPage from './pages/SignupPage.jsx'
import StudentDashboard from './pages/StudentDashboard'
import LoginPage from './pages/login.jsx'
import Challenge from './Pages/Challenge.jsx'
import JobApplication from './Pages/JobApplication.jsx'
import Header from "./Components/header/Header.jsx";
import Scholarship from './pages/Scholarship.jsx';
import Footer from "./Components/footer/Footer.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header className="header" />
      <div className="main-content">
        <Routes> 
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/studentDashboard" element={<StudentDashboard />} />
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
