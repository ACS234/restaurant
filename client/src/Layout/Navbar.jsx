import React, { useState,useEffect } from 'react';
import { IoMdPerson, IoIosContacts, IoMdLogIn } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import img from '../assets/img_1.jpg';

import { AiOutlineLogout } from "react-icons/ai";
import { IoHome } from "react-icons/io5";
import { MdRoundaboutRight, MdOutlineMenuBook } from "react-icons/md";
import { LiaFirstOrderAlt } from "react-icons/lia";
import { GiArchiveRegister } from "react-icons/gi";


const Navbar = ({ isAuthenticated, loggedInUser, handleLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentCartCount, setCurrentCartCount] = useState(0);
  const [currentUsername, setCurrentUsername] = useState('');

  useEffect(() => {
    const cartFromStorage = JSON.parse(sessionStorage.getItem('cart')) || [];
    setCurrentCartCount(cartFromStorage.length);  
    const storedUser = JSON.parse(sessionStorage.getItem('user')) || null;
    console.log("stored data",storedUser)
    if (storedUser && storedUser.username) {
      setCurrentUsername(storedUser.username);  
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[#99BC85] fixed z-10 w-full text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center flex-wrap">
        <div className="flex items-center">
          <img src={img} alt="Restaurant Logo" className="h-10 w-10 rounded-full" />
          <span className="ml-3 text-xl font-bold">Red Chillies</span>
        </div>
        <div className="md:hidden ml-4">
          <button onClick={toggleMobileMenu} className="hover:text-yellow-500">
            <FaBars size={25} />
          </button>
        </div>

        <div className="hidden md:flex space-x-10">
          {isAuthenticated && (
            <>
              <Link to="/" className="transform transition-transform duration-200 hover:scale-125 hover:text-green-600"><IoHome size={25} /></Link>
              <Link to="/menu" className="transform transition-transform duration-200 hover:scale-125 hover:text-green-600"><MdOutlineMenuBook size={25} /></Link>
              <Link to="/about" className="transform transition-transform duration-200 hover:scale-125 hover:text-green-600"><MdRoundaboutRight size={25} /></Link>
              <Link to="/contact" className="transform transition-transform duration-200 hover:scale-125 hover:text-green-600"><IoIosContacts size={25} /></Link>
              <Link to="/foods" className="transform transition-transform duration-200 hover:scale-125 hover:text-green-600"><LiaFirstOrderAlt size={25} /></Link>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="transform transition-transform duration-200 hover:scale-125 hover:text-green-600"><IoMdLogIn size={25} /></Link>
              <Link to="/register" className="transform transition-transform duration-200 hover:scale-125 hover:text-green-600"><GiArchiveRegister size={25} /></Link>
            </>
          ) : (
            <>
              <span className="text-sm">Hi, {currentUsername}</span>
              <button onClick={handleLogout} className="transform transition-transform duration-200 hover:scale-125 hover:text-red-600"><AiOutlineLogout size={25} /></button>
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
          <div className="hidden md:flex items-center space-x-6 ml-4">
            <Link to="/cart" className="relative hover:text-yellow-500">
              <span className="absolute -top-2 -right-3 bg-green-600 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                {currentCartCount}
              </span>
              <FaCartArrowDown size={25} />
            </Link>

            <Link to="#profile" className="hover:text-yellow-500">
              <IoMdPerson size={25} />
            </Link>
          </div>
        )}
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          {isAuthenticated && (
            <>
              <Link to="/" className="block hover:text-yellow-500">Home</Link>
              <Link to="/menu" className="block hover:text-yellow-500">Menu</Link>
              <Link to="/about" className="block hover:text-yellow-500">About Us</Link>
              <Link to="/contact" className="block hover:text-yellow-500">Contact</Link>
              <Link to="/foods" className="block hover:text-yellow-500">Order Now</Link>
              <Link to="/cart" className="relative hover:text-yellow-500">
                <span className="absolute -top-2 mr-80 bg-green-600 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                {currentCartCount}
                </span>
                <FaCartArrowDown size={25} />
              </Link>

              <Link to="#profile" className="hover:text-yellow-500">
                <IoMdPerson size={25} />
              </Link>
              <div className="mt-4">
                <span className="block mb-2">Hi, {loggedInUser?.username}</span>
                <button onClick={handleLogout} className="hover:text-yellow-500">Logout</button>
              </div>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link to="/login" className="block hover:text-yellow-500">Login</Link>
              <Link to="/register" className="block hover:text-yellow-500">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
