// App.jsx
//import React, { useState } from 'react'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './pages/Navbar'
import SideMenu from './pages/SideMenu'
import Dashboard from './pages/Dashboard'
import Income from './pages/Income'
import Expense from './pages/Expense'

const App = () => {
  //const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className=''>
      <Navbar />
      <div className='flex'>
        <SideMenu />

        <div className="w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App
