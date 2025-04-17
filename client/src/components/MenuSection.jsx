import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { getMenus } from '../services/apiService';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import FoodPage from '../pages/FoodPage'

const MenuSection = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const navigate=useNavigate()


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

  return (
    <>
    <section className="py-8 px-2 bg-gray-100 text-center">
      <ToastContainer />
      <div className='mt-20'>
      <h2 className="text-2xl font-bold mb-4">Our Menu</h2>
      <hr className="w-1/2 mx-auto my-6 border-t-2 border-dashed border-blue-400" />
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-6 justify-center mt-20">
        {menus.map((menu) => (
          <div key={menu.id} className="flex flex-col items-center space-y-2">
            <div
              className="w-32 h-32 mx-auto flex flex-col items-center justify-center rounded-full bg-white shadow-lg text-xs cursor-pointer transition-all hover:shadow-xl overflow-hidden relative"
              onClick={() => handleMenuClick(menu.id)}
            >
              <img
                src={`http://localhost:8000/${menu.image}`}
                alt={menu.name}
                className="w-full h-full object-cover rounded-full absolute top-0 left-0 opacity-80 hover:opacity-60 transition-opacity"
              />
              <div className="z-10 text-white font-semibold px-2 text-center drop-shadow-md">
                <p className="text-sm truncate">{menu.name}</p>
              </div>
            </div>
            <button
                  onClick={() => menuDetail(menu.id)}
                  className="w-full py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
              >
                  See Menu
              </button>
          </div>
        ))}
      </div>
      {selectedMenuId && selectedMenu && (
        <div className="mt-10 mx-auto max-w-3xl bg-white border border-gray-200 rounded-xl p-4 text-left text-sm shadow-sm">
          <h3 className="text-lg font-semibold mb-3">{selectedMenu.name} Items</h3>
          {selectedMenu.foods && selectedMenu.foods.length > 0 ? (
            selectedMenu.foods.map((item, index) => (
              <div key={index} className="py-2 border-b last:border-b-0">
                <div className="font-medium">{item.name}</div>
                <div className="text-gray-600">{item.description}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No items found for this menu.</p>
          )}
        </div>
      )}
      </div>
    </section>
    <FoodPage/>
    </>
  );
};

export default MenuSection;
