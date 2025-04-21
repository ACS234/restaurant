import React, { useEffect, useState } from 'react';
import { IoMdPerson, IoIosContacts, IoMdLogIn } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import img from '../assets/img_1.jpg';
import { AiOutlineLogout } from "react-icons/ai";
import { IoHome } from "react-icons/io5";
import {  MdOutlineMenuBook } from "react-icons/md";
import { LiaFirstOrderAlt } from "react-icons/lia";
import { GiArchiveRegister } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { getCart } from '../services/apiServices';



const Sidebar = ({ isAuthenticated, loggedInUser, handleLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [isVeg, setIsVeg] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [cartCount ,setCartCount]=useState(0)
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getCarts=async()=>{
    try {
      const data=await getCart();
      setCartCount(data.length)
    } catch (error) {
      console.log("Error",error)
    }
  }

  useEffect(()=>{
    getCarts()
  },[])

  const handleSearch = async () => {
    if (query.trim()) {
      const params = new URLSearchParams();
      params.append("query", query);
      if (category) params.append("category", category);
      if (isVeg) params.append("is_vegetarian", true);
      navigate(`/search?${params.toString()}`);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out z-10 bg-[#202c70] text-white shadow-lg 
        ${isSidebarOpen ? 'w-64' : 'w-20 none'}`}
      >
        <div
          className={`flex items-center border-b border-white transition-all duration-300 space-x-3 ${
            isSidebarOpen ? 'p-4' : 'p-2'
          }`}
        >
          <img src={img} alt="Logo" className="h-10 w-10 rounded-full" />
          {isSidebarOpen && <span className="text-xl font-bold">Red Chillies</span>}
          <span className="ml-auto cursor-pointer">
            <RxCross2 onClick={toggleSidebar} />
          </span>
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="hover:text-yellow-500 ml-2">
              <FaBars size={25} />
            </button>
          </div>
        </div>

        <div className={`mt-6 px-4 space-y-4 ${isMobileMenuOpen ? '' : 'hidden md:block'}`}>
          {isAuthenticated ? (
            <>
              <Link to="/" className="block hover:text-yellow-400">
                {isSidebarOpen ? (<span className="ml-2">Home</span>):(<IoHome size={25} />)}
              </Link>
              <Link to="/menu" className="block hover:text-yellow-400">
                {isSidebarOpen ?(<span className="ml-2">Menu</span>):(<MdOutlineMenuBook size={25}/>)}
              </Link>
              <Link to="/foods" className="block hover:text-yellow-400">
                {isSidebarOpen ?(<span className="ml-2">Order Now</span>):(<LiaFirstOrderAlt size={25} />)}
              </Link>
              <Link to="/cart" className={`block relative hover:text-yellow-400 `}>
                <span className="absolute -top-2 -ml-12 left-14 bg-green-600 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
                {isSidebarOpen ?(<span className="ml-2">Cart</span>):(<FaCartArrowDown size={25}/>)}
              </Link>
              <Link to="#profile" className="block hover:text-yellow-400">
               
                {isSidebarOpen ?( <span className="ml-2">Profile</span>):( <IoMdPerson />)}
              </Link>
              <div className="mt-4">
                <span className="block">Hi, {loggedInUser?.username}</span>
                <button onClick={handleLogout} className="hover:text-red-400 flex items-center">
                  {isSidebarOpen ?(<span className="ml-2">Logout</span>):(<AiOutlineLogout size={25} />)}
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="block hover:text-yellow-400">
                {isSidebarOpen ?( <span className="ml-2">Login</span>):(<IoMdLogIn size={25} />)}
              </Link>
              <Link to="/register" className="block hover:text-yellow-400">
                {isSidebarOpen ?(<span className="ml-2">Register</span>):(<GiArchiveRegister size={25} />)}
              </Link>
            </>
          )}
        </div>

        {isAuthenticated && (
          <div className="mt-6 px-4 py-2 text-black bg-[#202c70] rounded shadow">
            <input
              type="text"
              name="search"
              placeholder="Search foods..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-2 py-1 mb-2 rounded-md border w-full"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-2 py-1 mb-2 rounded-md border w-full"
            >
              <option value="">All Categories</option>
              {/* Add dynamic categories here */}
            </select>
            <label className="flex items-center space-x-2 text-sm mb-2">
              <input
                type="checkbox"
                checked={isVeg}
                onChange={(e) => setIsVeg(e.target.checked)}
                className="form-checkbox"
              />
              <span className='truncate'>Vegetarian Only</span>
            </label>
            <button
              onClick={handleSearch}
              className="bg-yellow-500 truncate text-black px-3 py-1 rounded-md hover:bg-yellow-400 w-full"
            >
              Search
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
