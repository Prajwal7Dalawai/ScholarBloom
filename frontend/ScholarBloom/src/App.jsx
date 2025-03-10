import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import './App.css'
import Landing from './Pages/Landing'
import SignUp from './Pages/SignUp'
import StudentDashboard from './Pages/StudentDashboard'

function App() {

  return (  
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/studentDashboard" element={<StudentDashboard />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
