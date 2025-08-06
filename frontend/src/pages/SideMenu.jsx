import React from 'react'
import { FaTachometerAlt, FaMoneyBillWave, FaWallet } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

const SideMenu = () => {
  const location = useLocation()

  const menuItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, link: '/dashboard' },
    { name: 'Income', icon: <FaMoneyBillWave />, link: '/income' },
    { name: 'Expense', icon: <FaWallet />, link: '/expense' },
  ]

  return (
    <div className="w-64 h-screen bg-white-50 p-4 shadow-md">
      <h3 className="text-xl font-semibold text-blue-900 mb-6">Menu</h3>
      <ul className="space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.link

          return (
            <li key={index}>
              <Link
                to={item.link}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200
                  ${isActive ? 'bg-blue-600 text-white' : 'text-blue-800 hover:bg-blue-100'}
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-base">{item.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SideMenu
