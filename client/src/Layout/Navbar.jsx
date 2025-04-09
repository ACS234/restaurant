import React from 'react';
import { IoMdPerson } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import img from '../assets/img_1.jpg';


const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={img} 
            alt="Restaurant Logo"
            className="h-10 w-auto rounded-full"
          />
          <span className="ml-3 text-xl font-bold">Red Chillies</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link to="#home" className="text-white hover:text-yellow-500">Home</Link>
          <Link to="#menu" className="text-white hover:text-yellow-500">Menu</Link>
          <Link to="#about" className="text-white hover:text-yellow-500">About Us</Link>
          <Link to="#reservations" className="text-white hover:text-yellow-500">Reservations</Link>
          <Link to="#contact" className="text-white hover:text-yellow-500">Contact</Link>
          <Link to="#order" className="text-white hover:text-yellow-500">Order Now</Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="#cart" className="text-white hover:text-yellow-500">
          <span className='mb-8 bg-red-600 rounded-full'>5+</span>
          <FaCartArrowDown size={25} />
          </Link>
          <Link to="#profile" className="text-white hover:text-yellow-500">
          <IoMdPerson size={25} />
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <button className="text-white hover:text-yellow-500">
            <FaBars size={25}/>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
