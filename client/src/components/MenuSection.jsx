import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { getMenus } from '../services/apiServices';
import { useNavigate } from 'react-router-dom';
import FoodPage from '../pages/FoodPage'
import { MdOutlineMoreHoriz } from "react-icons/md";

const MenuSection = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const navigate = useNavigate()


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
    // You can use your cart logic here
    toast.success('Adding to cart:', item);
  };





  return (
    <>
      <section className="py-8 px-2 bg-gray-900 text-center">
        <ToastContainer />
        <div className='mt-20'>
          <h2 className="text-2xl font-bold mb-4">Our Menu</h2>
          <hr className="w-1/2 mx-auto my-6 border-t-2 border-dashed border-blue-400" />
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-11 gap-10 justify-center mt-20">
            {menus.map((menu) => (
              <div key={menu.id} className="flex flex-col items-center space-y-2">
                <div
                  className="w-32 h-32 mx-auto flex flex-col items-center justify-center rounded-full bg-white shadow-lg text-xs cursor-pointer transition-all hover:shadow-xl overflow-hidden relative"
                  onClick={() => handleMenuClick(menu.id)}
                >
                  <img
                    src={`http://localhost:8000${menu.image}`}
                    alt={menu.name}
                    className="w-full h-full object-cover rounded-full absolute top-0 left-0 opacity-80 hover:opacity-60 transition-opacity"
                  />
                  <div className="z-10 text-white font-semibold px-2 text-center drop-shadow-md">
                    <p className="text-sm truncate">{menu.name}</p>
                  </div>
                </div>
                <button
                  aria-label={`View details for ${menu.name}`}
                  onClick={() => menuDetail(menu.id)}
                  className="ml-16 flex items-center justify-center cursor-pointer transform scale-100 hover:scale-110 transition duration-300 hover:bg-gray-600 text-white rounded text-xs"
                >
                  <MdOutlineMoreHoriz size={20} />
                </button>
              </div>
            ))}
          </div>
          {selectedMenuId && selectedMenu && (
            <div className="mt-10 mx-auto max-w-5xl">
              <h3 className="text-2xl font-semibold mb-6">{selectedMenu.name} Items</h3>

              {selectedMenu.foods && selectedMenu.foods.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {selectedMenu.foods.map((item) => (
                    <div
                      key={item.id}
                      className="bg-cyan-950 border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col justify-between"
                    >
                      <div>
                        <img
                          src={`http://localhost:8000${item.image}`}

                          alt={item.name}
                          className="w-full h-80 sm:h-40 md:h-40 object-cover rounded mb-2"
                        />
                        <h4 className="text-lg font-semibold mb-1">{item.name}</h4>
                        <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                        <div className="text-white font-medium mb-1"><span className='bg-green-600 px-4 py-2 rounded-lg'>${item.price}</span></div>
                        <div className="text-yellow-500 text-sm mb-3">
                          {"★".repeat(Math.round(item.rating || 0)).padEnd(5, "☆")}
                          <span className="text-gray-500 ml-1">({item.rating ?? "0.0"})</span>
                        </div>
                      </div>

                      <button
                        className={`mt-auto text-white text-sm font-medium py-2 px-4 rounded transition duration-200 ${item
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                          : 'bg-gray-300 cursor-not-allowed'
                          }`}
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </button>

                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic text-sm">No items found for this menu.</p>
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
