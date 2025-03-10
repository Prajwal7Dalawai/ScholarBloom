import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing'
import LoginPage from './pages/login'
import SignUp from './pages/SignUp'
import StudentDashboard from './pages/StudentDashboard'
import UniversityDashboard from './pages/UniversityDashboard'
import ScholarshipPage from './pages/ScholarshipPage'


function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/landing' element={<Landing></Landing>} />
        <Route path='/login' element={<LoginPage></LoginPage>} />
        <Route path='/signup' element={<SignUp></SignUp>} />
        <Route path='/dashboard' element={<StudentDashboard></StudentDashboard>} />
        <Route path='/unidashboard' element={<UniversityDashboard></UniversityDashboard>} />
        <Route path='/ScholarshipPage' element={<ScholarshipPage></ScholarshipPage>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
