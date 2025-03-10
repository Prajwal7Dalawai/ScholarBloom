import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import './App.css'
import Landing from './Pages/Landing'
import SignupPage from './Pages/SignupPage.jsx'
import StudentDashboard from './Pages/StudentDashboard'
import LoginPage from './Pages/login.jsx'
import Challenge from './Pages/Challenge.jsx'

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
  )
}

export default App
