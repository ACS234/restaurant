import React from "react";
import { Link } from "react-router-dom";
import { IoMdPerson, IoIosContacts, IoMdLogIn } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import { AiOutlineLogout, AiOutlineMenu, AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { IoHome, IoRestaurantOutline, IoFastFoodSharp } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa6";
import { GiVendingMachine } from "react-icons/gi";
import { RiMenuSearchFill } from "react-icons/ri";

function Sidebar({ isAuthenticated, isSidebarOpen, toggleSidebar, handleLogout }) {
  return (
    <div
      className={`h-screen bg-[#262416] text-gray-500 fixed top-0 left-0 transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between p-4 bg-gray-900">
            <div className="flex items-center space-x-2">
              <IoRestaurantOutline size={35} />
              {isSidebarOpen && <span className="text-white text-lg">Red Chillies</span>}
            </div>
            {isSidebarOpen ? (
              <AiFillCaretLeft
                size={35}
                onClick={toggleSidebar}
                className="cursor-pointer text-white"
              />
            ) : (
              <AiFillCaretRight
                size={35}
                onClick={toggleSidebar}
                className="cursor-pointer text-white"
              />
            )}
          </div>

          <div className="mt-6 space-y-4 px-3">
            {isAuthenticated ? (
              <>
                <Link to="/" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                <IoHome size={30} />
                {isSidebarOpen && <span className="ml-4">Home</span>}
                </Link>
                <Link to="/menu" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                  <RiMenuSearchFill size={30} />
                  {isSidebarOpen && <span className="ml-4">Menu</span>}
                </Link>
                <Link to="/foods" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                  <IoFastFoodSharp size={30} />
                  {isSidebarOpen && <span className="ml-4">Explore Foods</span>}
                </Link>
                <Link to="/cart" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                  <FaCartArrowDown size={30} />
                  {isSidebarOpen && <span className="ml-4">Cart</span>}
                </Link>
                <Link to="/users" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                  <IoIosContacts size={30} />
                  {isSidebarOpen && <span className="ml-4">Users</span>}
                </Link>
                <Link to="/vendors" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                  <GiVendingMachine size={30} />
                  {isSidebarOpen && <span className="ml-4">Vendors</span>}
                </Link>
                <Link to="/services" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                  <GrServices size={30} />
                  {isSidebarOpen && <span className="ml-4">Services</span>}
                </Link>
                <Link to="/reservations" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                  <FaRegAddressCard size={30} />
                  {isSidebarOpen && <span className="ml-4">Reservations</span>}
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                  <IoMdLogIn size={30} />
                  {isSidebarOpen && <span className="ml-4">Login</span>}
                </Link>
                <Link to="/register" className="flex items-center space-x-3 text-white hover:text-indigo-400">
                  <IoMdPerson size={30} />
                  {isSidebarOpen && <span className="ml-4">Register</span>}
                </Link>
              </>
            )}
          </div>
        </div>

        {isAuthenticated ? (
          <div className="p-4 border-t border-gray-700 flex items-center space-x-3">
            <IoRestaurantOutline size={30} className="w-10 h-10 rounded-full" />
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-white text-sm">Red Chillies</span>
                <span className="text-xs text-gray-400">redchillies@info.com</span>
              </div>
            )}
            <AiOutlineLogout
              size={30}
              onClick={handleLogout}
              className="ml-auto cursor-pointer text-white"
              title="Logout"
            />
          </div>
        ):(
          <div className="p-4 border-t border-gray-700 flex items-center space-x-3">
            <IoRestaurantOutline size={30} className="w-10 h-10 rounded-full" />
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-white text-sm">Red Chillies</span>
                <span className="text-xs text-gray-400">redchillies@info.com</span>
              </div>
            )}
            <AiOutlineLogout
              size={30}
              onClick={handleLogout}
              className="ml-auto cursor-pointer text-white"
              title="Logout"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
