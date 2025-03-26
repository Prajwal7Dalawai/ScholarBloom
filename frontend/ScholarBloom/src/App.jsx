import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import './App.css'
import Landing from './pages/Landing'
import SignupPage from './pages/SignupPage.jsx'
import StudentDashboard from './pages/StudentDashboard'
import LoginPage from './pages/login.jsx'
import Challenge from './pages/Challenge.jsx'

function App() {

  return (  
    <BrowserRouter>
      <Routes> 
        <Route path="/landing" element={<Landing />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/studentDashboard" element={<StudentDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/challenge" element={<Challenge />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
