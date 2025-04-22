import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { getMenus } from '../services/apiServices';
import { useNavigate } from 'react-router-dom';
import FoodPage from '../pages/FoodPage';
import { MdOutlineMoreHoriz } from "react-icons/md";

const MenuSection = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getMenus();
        setMenus(data);
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
    setSelectedMenuId((prevId) => (prevId === id ? null : id));
  };

  const menuDetail = (id) => {
    if (!id) {
      toast.error("Invalid ID passed to menuDetail: " + id);
      return;
    }
    navigate(`/menu-detail/${id}`);
  };

  const selectedMenu = menus.find((menu) => menu.id === selectedMenuId);

  const handleAddToCart = (item) => {
    toast.success(`Added ${item.name} to cart!`);
  };

  return (
    <>
      <section className="relative py-12 px-4 min-h-screen text-white bg-gradient-to-br from-[#323f76] via-[#d88d8d] to-[#caa452] overflow-hidden">
        <ToastContainer />
      
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white text-center mb-8">
            Our Menu
          </h2>
          <hr className="w-1/2 mx-auto my-6 border-t-2 border-dashed border-yellow-200" />

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 justify-center">
            {menus.map((menu) => (
              <div key={menu.id} className="flex flex-col items-center p-2 hover:scale-105 rounded-md space-y-2 hover:bg-blue-700">
                <div
                  className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-lg shadow-xl hover:scale-105 hover:w-24 hover:h-24 transition-transform overflow-hidden relative border border-white/30 ring-1 ring-white/10 cursor-pointer"
                  onClick={() => handleMenuClick(menu.id)}
                >
                  <img
                    src={`http://localhost:8000${menu.image}`}
                    alt={menu.name}
                    className="w-full h-full object-cover rounded-full absolute top-0 left-0 opacity-80 hover:opacity-60 transition-opacity"
                  />
                  <div className="z-10 text-white font-bold text-center absolute bottom-2 left-0 right-0 bg-black/40 px-2 py-1 text-sm">
                    {menu.name}
                  </div>
                </div>

                <button
                  aria-label={`View details for ${menu.name}`}
                  onClick={() => menuDetail(menu.id)}
                  className="flex items-center justify-center cursor-pointer px-2 py-1 text-sm bg-white/10 hover:bg-white/20 rounded-full transition-all text-white backdrop-blur-md shadow-md"
                >
                  <MdOutlineMoreHoriz size={20} />
                </button>
              </div>
            ))}
          </div>

          {selectedMenuId && selectedMenu && (
            <div className="mt-20 mx-auto max-w-6xl">
              <h3 className="text-3xl font-semibold mb-8 text-center">
                {selectedMenu.name} Items
              </h3>

              {selectedMenu.foods && selectedMenu.foods.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                  {selectedMenu.foods.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl p-5 flex flex-col justify-between hover:scale-105 transition-transform"
                    >
                      <div>
                        <img
                          src={`http://localhost:8000/media/${item.image}`}
                          alt={item.name}
                          className="w-full h-48 object-cover rounded mb-4"
                        />
                        <h4 className="text-xl font-semibold mb-2">{item.name}</h4>
                        <p className="text-gray-200 text-sm mb-3">{item.description}</p>
                        <div className="text-white font-semibold text-sm mb-1">
                          <span className="bg-gradient-to-r from-green-400 to-blue-500 px-4 py-1 rounded-full shadow-md">
                            ₹ {item.price}
                          </span>
                        </div>
                        <div className="text-yellow-400 text-sm mb-3">
                          {"★".repeat(Math.round(item.rating || 0)).padEnd(5, "☆")}
                          <span className="text-gray-300 ml-1">({item.rating ?? "0.0"})</span>
                        </div>
                      </div>

                      <button
                        className="mt-auto text-white text-sm font-medium py-2 px-4 rounded bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition duration-200 shadow-md"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-300 italic text-center text-sm">No items found for this menu.</p>
              )}
            </div>
          )}
        </div>
      </section>
      <FoodPage />
    </>
  );
};

export default MenuSection;
