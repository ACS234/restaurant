import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { getMenus } from '../services/apiService'
import {Link,useNavigate} from 'react-router-dom'

const MenuSection = () => {
  const [menus, setMenus] = useState([])


  const navigate=useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getMenus();
        // console.log('Fetched food data:', data);
        setMenus(data);
      } catch (error) {
        toast.error('Failed to load foods.', error.message);
      }
    }
    getData()
  }, [])

  // if(loading) return <p>loading data...</p>

  const menuDetail = (id) => {
    if (!id) {
      toast.error("Invalid ID passed to menuDetail:", id);
      return;
    }
    navigate(`/menu-detail/${id}`);
  };

  return (
    <section className="py-16 px-4 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-6">Our Menu</h2>
      <hr className="w-1/2 mx-auto my-10 border-t-4 border-dashed border-blue-500" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {menus.map((menu) => (
          <div key={menu.id} className="h-1/4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src={`http://localhost:8000/${menu.image}`}
                alt={menu.name}
                className="w-full h-60 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-xl">{menu.name}</h3>
              <p className="mt-2">{(menu.description).substring(0, 35)}.</p>
              <div className="flex mt-4 space-x-4">
              <button
                onClick={() => menuDetail(menu.id)}
                className="inline-block px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-900"
              >
                See Menu
              </button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
