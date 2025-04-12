import React from 'react';
import { IoMdPerson } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import img from '../assets/img_1.jpg';

const Navbar = ({ isAuthenticated, loggedInUser, handleLogout }) => {
  return (
    <nav className="bg-[#99BC85] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center flex-wrap">
        <div className="flex items-center">
          <img src={img} alt="Restaurant Logo" className="h-10 w-10 rounded-full" />
          <span className="ml-3 text-xl font-bold">Red Chillies</span>
        </div>

        {isAuthenticated && (
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-yellow-500">Home</Link>
            <Link to="/menu" className="hover:text-yellow-500">Menu</Link>
            <Link to="/about" className="hover:text-yellow-500">About Us</Link>
            <Link to="/contact" className="hover:text-yellow-500">Contact</Link>
            <Link to="/foods" className="hover:text-yellow-500">Order Now</Link>
          </div>
        )}

        <div className="hidden md:flex items-center space-x-6">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:text-yellow-500">Login</Link>
              <Link to="/register" className="hover:text-yellow-500">Register</Link>
            </>
          ) : (
            <>
              <span className="text-sm">Hi, {loggedInUser?.username}</span>
              <button onClick={handleLogout} className="text-white hover:text-yellow-500">Logout</button>
            </>
          )}
        </div>

        {isAuthenticated && (
          <div className="hidden md:flex items-center space-x-2">
            <input
              type="text"
              name="search"
              placeholder="Search foods..."
              className="px-2 py-1 rounded text-black bg-emerald-500"
            />
            <input
              type="button"
              value="Submit"
              className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400 cursor-pointer"
            />
          </div>
        )}

        {isAuthenticated && (
          <div className="flex items-center space-x-6 ml-4">
            <Link to="/cart" className="relative hover:text-yellow-500">
              <span className="absolute -top-2 -right-3 bg-green-600 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                5
              </span>
              <FaCartArrowDown size={25} />
            </Link>

            <Link to="#profile" className="hover:text-yellow-500">
              <IoMdPerson size={25} />
            </Link>
          </div>
        )}

        <div className="md:hidden ml-4">
          <button className="hover:text-yellow-500">
            <FaBars size={25} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
