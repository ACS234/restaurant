/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { getMenus, addCart } from '../services/apiServices';
import { useNavigate } from 'react-router-dom';
import { MdOutlineMoreHoriz } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion'; 
import { FaCartArrowDown, FaHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import FoodPage from '../pages/FoodPage';

const MenuSection = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getMenus();
        setMenus(data);
        if (data.length > 0) {
          setSelectedMenuId(data[0].id); 
        }
      } catch (error) {
        toast.error('Failed to load foods. ' + error.message);
      }
    };
    getData();
  }, []);

  const handleMenuClick = (id) => {
    if (!id) {
      toast.error('Invalid ID passed to menuDetail: ' + id);
      return;
    }
    setSelectedMenuId(id);
  };

  const menuDetail = (id) => {
    if (!id) {
      toast.error("Invalid ID passed to menuDetail: " + id);
      return;
    }
    navigate(`/menu-detail/${id}`);
  };

  const selectedMenu = menus.find((menu) => menu.id === selectedMenuId);

  const handleAddToCart = async (foodId) => {
    try {
      const result = await addCart({ food: foodId });
      if (result) {
        toast.success("Item added to cart!");
        setTimeout(() => {
          navigate('/cart');
        }, 2000);
      }
    } catch (error) {
      toast.error("Please log in first.", error);
    }
  };

  const handleShowDetails = (foodItem) => {
    setSelectedFood(foodItem);
    setShowModal(true);
  };

  return (
    <>
      <section className="relative py-8 px-4 min-h-screen bg-gray-200 text-white">
        <ToastContainer />
        <div className="relative max-w-7xl mx-auto mt-0">
          <h2 className="text-4xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-white">
            Our Menu
          </h2>
          <hr className="w-10/12 mx-auto mb-4 border-t-2 border-dashed border-gary-600" />

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4 rounded-lg shadow-lg p-6 space-y-4 sticky top-0 z-10 bg-[#2c3e50]">
              {menus.map((menu) => (
                <div
                  key={menu.id}
                  className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-transform duration-300 transform 
                  ${selectedMenuId === menu.id ? 'bg-[#34495e] scale-105' : 'hover:bg-[#2c3e50] hover:scale-105'}`}
                  onClick={() => handleMenuClick(menu.id)}
                >
                  <span className="text-sm text-shadow-violet-800 font-semibold trucate">{menu.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      menuDetail(menu.id);
                    }}
                    className="text-white hover:text-yellow-400"
                  >
                    <MdOutlineMoreHoriz size={24} />
                  </button>
                </div>
              ))}
            </div>
            <div className="w-full md:w-3/4 py-8 px-4 bg-[#34495e40] no-scrollbar rounded-lg z-50 overflow-y-auto max-h-[80vh]">
              <AnimatePresence>
                {selectedMenu ? (
                  <motion.div
                    key={selectedMenu.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-3xl font-semibold text-center mb-8">{selectedMenu.name} Items</h3>

                    {selectedMenu.foods.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {selectedMenu.foods.map((item) => (
                          <div
                            key={item.id}
                            className="bg-[#1f2d3dcc] p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300"
                          >
                            <div className="relative">
                              <img
                                src={`http://localhost:8000/media/${item.image}`}
                                alt={item.name}
                                className="w-full h-40 object-cover rounded-md mb-4"
                              />
                              <div className="absolute top-16 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100 transition-all duration-300 bg-transparent bg-opacity-40">
                                <button
                                  onClick={() => handleAddToCart(item.id)}
                                  className="bg-[#42424061] text-white p-2 rounded-full"
                                >
                                  <FaCartArrowDown color='yellow' size={24} />
                                </button>
                                <button
                                  onClick={() => handleShowDetails(item.id)}
                                  className="bg-[#4f4e4d4c] text-white p-2 rounded-full"
                                >
                                  <BsThreeDots color='black' size={24} />
                                </button>
                              </div>
                            </div>
                            <h4 className="text-lg font-semibold text-white">{item.name}</h4>
                            <p className="text-sm text-gray-300">{item.description}</p>
                            <div className="mt-2 text-yellow-400">
                              {`★`.repeat(Math.round(item.rating || 0)).padEnd(5, "☆")}
                              <span className="text-gray-300 ml-1">({item.rating ?? "0.0"})</span>
                            </div>
                            <div className="mt-2 text-lg font-semibold text-green-400">
                              ₹ {item.price}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-400 italic">No items found for this menu.</p>
                    )}
                  </motion.div>
                ) : (
                  <motion.p
                    className="text-center text-gray-400 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Select a menu to see items.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Modal for Food Details */}
        {showModal && selectedMenu && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
            <div className="bg-[#FF6F61] rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-700 hover:text-black text-2xl"
              >
                ✕
              </button>
              <img
                src={`http://localhost:8000${selectedMenu.image}`}
                alt={selectedMenu.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="flex items-center">
                  <span className="text-gray-300 ml-1">{selectedMenu.category }</span>
                </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedMenu.name}</h2>
              <p className="text-sm text-gray-600 mb-3">{selectedMenu.description}</p>
              <button
                onClick={() => {
                  handleAddToCart(selectedMenu.id);
                  setShowModal(false);
                }}
                className="w-full py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </section>

      <FoodPage />
    </>
  );
};

export default MenuSection;
