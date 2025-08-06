import React from 'react'
//import SideMenu from './SideMenu'
//import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'

const Navbar = () => {
    //const [openSideMenu, setOpenSideMenu] = useState(false)

    return (
        <div className="w-full h-[100px] bg-gradient-to-b from-white to-gray-50 shadow-md px-6 flex items-center justify-between sticky top-0 z-50 rounded-b-xl">
            <h2 className="text-xl font-semibold text-black">Expense Tracker</h2>
        </div>
    );

}

export default Navbar
