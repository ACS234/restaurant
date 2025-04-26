import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdPerson, IoIosContacts, IoMdLogIn } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import { AiOutlineLogout, AiOutlineMenu, AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { IoHome, IoRestaurantOutline, IoFastFoodSharp, IoSettings, IoChevronDown, IoChevronForward, IoSearch } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa6";
import { GiVendingMachine } from "react-icons/gi";
import { RiMenuSearchFill, RiAdminFill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { ImProfile } from "react-icons/im";
import { MdTableRestaurant } from "react-icons/md";
 





function Sidebar({ isAuthenticated, isSidebarOpen, toggleSidebar, handleLogout }) {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  return (
    <div
      className={`h-screen bg-[#051225] text-gray-500 fixed top-0 left-0 transition-all duration-250 ${isSidebarOpen ? "w-64 z-50" : "w-14"
        }`}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between p-4 bg-gray-900">
            <div className="flex items-center space-x-2">
              <IoRestaurantOutline onClick={toggleSidebar} size={35} />
              {isSidebarOpen && <span className="text-white text-lg">Red Chillies</span>}
            </div>
            {isSidebarOpen ? (
              <AiFillCaretLeft
                size={25}
                onClick={toggleSidebar}
                className="cursor-pointer text-white"
              />
            ) : (
              <AiFillCaretRight
                size={25}
                onClick={toggleSidebar}
                className="cursor-pointer text-white"
              />
            )}
          </div>

          <div className="mt-6 space-y-2 px-2">
            {isAuthenticated ? (
              <>
                <div className="text-white">
                  <div className="flex items-center justify-between hover:text-indigo-400 cursor-pointer">
                    <Link to="/" className="flex items-center space-x-3">
                      <RiAdminFill onClick={toggleDropdown} size={25} />
                      {isSidebarOpen && <span className="ml-4">Admin</span>}
                    </Link>
                    {isSidebarOpen && (
                      <button onClick={toggleDropdown} className="ml-auto pr-2">
                        {isDropdownOpen ? <IoChevronDown size={25}
                          className={`transform transition-transform duration-250 ${isDropdownOpen ? 'rotate-180' : ''
                            }`}
                        /> : <IoChevronForward size={25} />}
                      </button>
                    )}
                  </div>

                  {isSidebarOpen && isDropdownOpen && (
                    <div className={`ml-10 overflow-hidden transition-all duration-250 ${isSidebarOpen
                      ? isDropdownOpen
                        ? 'opacity-100 delay-75'
                        : 'opacity-0 delay-75'
                      : 'hidden'
                      }`}>
                      <Link to="/dashboard" className="flex items-center m-1 p-2 hover:bg-blue-950 rounded-md hover:text-indigo-400">
                        <RxDashboard size={25} />
                        {isSidebarOpen && <span className="ml-4">Dashboard</span>}
                      </Link>
                      <Link to="/settings" className="flex items-center m-1 p-2 hover:bg-blue-950 rounded-md hover:text-indigo-400">
                        <IoSettings size={25} />
                        {isSidebarOpen && <span className="ml-4">Setting</span>}</Link>
                      <Link to="/reservations" className="flex items-center m-1 p-2 hover:bg-blue-950 rounded-md hover:text-indigo-400">
                        <ImProfile size={25} />
                        {isSidebarOpen && <span className="ml-4">Resevations</span>}</Link>
                    </div>
                  )}
                </div>
                <Link to="/" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                  <IoHome size={25} />
                  {isSidebarOpen && <span className="ml-4">Home</span>}
                </Link>
                <Link to="/menu" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                  <RiMenuSearchFill size={25} />
                  {isSidebarOpen && <span className="ml-4">Menu</span>}
                </Link>
                <Link to="/foods" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                  <IoFastFoodSharp size={25} />
                  {isSidebarOpen && <span className="ml-4">Explore Foods</span>}
                </Link>
                <Link to="/cart" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                  <FaCartArrowDown size={25} />
                  {isSidebarOpen && <span className="ml-4">Cart</span>}
                </Link>
                <Link to="/users" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                  <IoIosContacts size={25} />
                  {isSidebarOpen && <span className="ml-4">Users</span>}
                </Link>
                <Link to="/vendors" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                  <GiVendingMachine size={25} />
                  {isSidebarOpen && <span className="ml-4">Vendors</span>}
                </Link>
                <Link to="/table_order" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                  <GrServices size={25} />
                  {isSidebarOpen && <span className="ml-4">Services</span>}
                </Link>
                <Link to="/qr_code" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                  <MdTableRestaurant
                    size={25} />
                  {isSidebarOpen && <span className="ml-4">Tables</span>}
                </Link>
                <Link to="/menus" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                  <MdTableRestaurant
                    size={25} />
                  {isSidebarOpen && <span className="ml-4">Qr Order</span>}
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                  <IoMdLogIn size={25} />
                  {isSidebarOpen && <span className="ml-4">Login</span>}
                </Link>
                <Link to="/register" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                  <IoMdPerson size={25} />
                  {isSidebarOpen && <span className="ml-4">Register</span>}
                </Link>
              </>
            )}
          </div>
        </div>

        {isAuthenticated ? (
          <div className="p-2 border-t border-gray-700 flex items-center space-x-2">
            <IoRestaurantOutline size={25} />
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-white text-sm">Red Chillies</span>
                <span className="text-xs text-gray-400">redchillies@info.com</span>
              </div>
            )}
            <AiOutlineLogout
              size={25}
              onClick={handleLogout}
              className="ml-auto cursor-pointer text-white"
              title="Logout"
            />
          </div>
        ) : (
          <div className="p-4 border-t border-gray-700 flex items-center space-x-3">
            <IoRestaurantOutline size={35} />
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-white text-sm">Red Chillies</span>
                <span className="text-xs text-gray-400">redchillies@info.com</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
