import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Landing from './pages/Landing'
import LoginPage from './pages/login'
import SignUp from './pages/SignUp'
import StudentDashboard from './pages/StudentDashboard'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/landing' element={<Landing></Landing>} />
        <Route path='/login' element={<LoginPage></LoginPage>} />
        <Route path='/signup' element={<SignUp></SignUp>} />
        <Route path='/dashboard' element={<StudentDashboard></StudentDashboard>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
