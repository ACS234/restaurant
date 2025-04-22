import React from "react";
import { Link } from "react-router-dom";
import {IoMdPerson, IoIosContacts, IoMdLogIn} from "react-icons/io";
import {FaCartArrowDown} from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import {AiOutlineLogout, AiOutlineMenu} from "react-icons/ai";
import {IoHome,IoRestaurantOutline} from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa6";
import { GiVendingMachine } from "react-icons/gi";
import { RiMenuSearchFill } from "react-icons/ri";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { IoFastFoodSharp } from "react-icons/io5";

function Sidebar({ isAuthenticated, isSidebarOpen, toggleSidebar, handleLogout }) {
  return (
    <div
      className={`h-screen bg-gray-950 text-gray-500 fixed top-0 left-0 z-50 transition-all duration-300 ${isSidebarOpen ? "w-64 z-50" : "w-20"
        }`}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between p-4 bg-gray-900">
            <div className="flex items-center space-x-2">
              <IoRestaurantOutline  size={35} />
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
          <div className="mt-6 space-y-4 px-4">
            <SidebarLink to="/" icon={<IoHome size={35} />} label="Home" isSidebarOpen={isSidebarOpen} />
            {isAuthenticated ? (
              <>
                <SidebarLink to="/menu" icon={<RiMenuSearchFill size={35} />} label="Menu" isSidebarOpen={isSidebarOpen} />
                <SidebarLink to="/foods" icon={<IoFastFoodSharp size={35} />} label="Explore foods" isSidebarOpen={isSidebarOpen} />
                <SidebarLink to="/cart" icon={<FaCartArrowDown size={35} />}  label="Cart" isSidebarOpen={isSidebarOpen} />
                <SidebarLink to="/users" icon={<IoIosContacts size={35} />} label="Users" isSidebarOpen={isSidebarOpen} />
                <SidebarLink to="/vendors" icon={<GiVendingMachine size={35} />} label="Vendors" isSidebarOpen={isSidebarOpen} />
                <SidebarLink to="/services" icon={<GrServices size={35} />} label="Services" isSidebarOpen={isSidebarOpen} />
                <SidebarLink to="/reservations" icon={<FaRegAddressCard size={35} />} label="Reservations" isSidebarOpen={isSidebarOpen} />
              </>
            ) : (
              <>
              <SidebarLink to="/login" icon={<IoMdLogIn size={35} />} label="Login" isSidebarOpen={isSidebarOpen} />
              <SidebarLink to="/register" icon={<IoMdPerson size={35} />} label="Login" isSidebarOpen={isSidebarOpen} />
              </>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-700 flex items-center space-x-3">
        <IoRestaurantOutline size={35}  className="w-10 h-10 rounded-full" />
          {isSidebarOpen && (
            <div className="flex flex-col">
              <span className="text-white text-sm">Red Chillies</span>
              <span className="text-xs text-gray-400">redchillies@info.com</span>
            </div>
          )}
          <AiOutlineLogout
          size={35}
            onClick={handleLogout}
            className="ml-auto cursor-pointer text-white"
            title="Logout"
          />
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ to, icon, label, isSidebarOpen }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-3 text-white hover:text-indigo-400 transition-colors"
    >
      {icon}
      {isSidebarOpen && <span>{label}</span>}
    </Link>
  );
}

export default Sidebar;
