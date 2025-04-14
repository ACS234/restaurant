import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { getMenus } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const MenuSection = () => {
  const [menus, setMenus] = useState([]);
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

  const menuDetail = (id) => {
    if (!id) {
      toast.error("Invalid ID passed to menuDetail: " + id);
      return;
    }
    navigate(`/menu-detail/${id}`);
  };

  return (
    <section className="py-8 px-2 bg-gray-100 text-center">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Our Menu</h2>
      <hr className="w-1/2 mx-auto my-6 border-t-2 border-dashed border-blue-400" />

      <div className="grid grid-cols-5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
        {menus.map((menu) => (
          <div key={menu.id} className="bg-white p-2 rounded-md shadow-sm text-xs">
            <img
              src={`http://localhost:8000/${menu.image}`}
              alt={menu.name}
              className="w-full h-24 object-cover rounded mb-2"
            />
            <h3 className="font-semibold text-sm mb-1 truncate">{menu.name}</h3>
            <p className="text-gray-700 mb-1 truncate">{menu.description.substring(0, 50)}...</p>
            <button
              onClick={() => menuDetail(menu.id)}
              className="mt-2 px-1 py-0.5 bg-green-500 text-white rounded-sm text-[10px] hover:bg-green-700"
            >
              See Menu
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
