import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import './App.css'
import Landing from './Pages/Landing'

function App() {

  return (  
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
