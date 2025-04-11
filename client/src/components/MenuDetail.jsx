import React, { useEffect, useState } from 'react';
import { getMenuDetail } from '../services/apiService';
import { toast } from 'react-toastify';
import { useParams, Link } from 'react-router-dom';
import { IoIosStarHalf } from "react-icons/io";

const MenuDetail = () => {
  const { id } = useParams()
  const [menuItem, setMenuDetail] = useState([]);
  const [foodItem, setFoodDetail] = useState([]);

  useEffect(() => {
    const getDetail = async (id) => {
      try {
        const data = await getMenuDetail(id)
        console.log("menu detail", data);
        console.log("menu food detail", data.foods);
        setMenuDetail(data)
        setFoodDetail(data.foods)
      } catch (error) {
        toast.error("something went wrong", error)
      }
    }
    if (id)
      getDetail(id)
  }, [id])

  return (
    <section className="py-16 px-4 bg-gray-100 text-center">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl text-justify font-bold mb-6">{menuItem.name}</h2>
        <img
          src={`http://localhost:8000/${menuItem.image}`}
          alt={menuItem.title}
          className="w-full h-100 object-cover rounded-lg mb-6 -z-10"
        />
        <p className="text-xl text-justify font-semibold text-gray-900 mb-4">{menuItem.description}</p>
        <hr class="w-full mx-auto my-2 border-t-2 border-green-500-500" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8 m-2.5">
          {foodItem.map((item) => (
            <div key={item.id} className="bg-white w-full p-4 rounded-lg shadow-lg">
              <img
                src={`http://localhost:8000/${item.image}`}
                alt={menuItem.title}
                className="w-full h-40 object-cover rounded-lg mb-6"
              />
              <p className="text-sm text-justify mt-0">
                <strong>Name:</strong> {(item.name).substring(0,30)}...
              </p>
              <p className="text-sm text-justify mt-0">
                <strong>Cuisine Type:</strong> {item.cuisine_type}
              </p>
              <p className="text-sm text-justify mt-0">
                <strong>Category:</strong> {item.category}
              </p>
              <p className="text-sm text-justify mt-0">
                <strong>Type:</strong>{' '}
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-1 ${item.is_vegetarian ? 'bg-green-500' : 'bg-red-500'
                    }`}
                ></span>
                {item.is_vegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
              </p>
              <p className="flex items-center text-sm mt-1 space-x-1">
                <strong>Rating:</strong>
                <span>{item.rating}</span>
                <IoIosStarHalf className="text-green-500" />
              </p>
              <div className="flex mt-6 space-x-20">
                <Link to="#order"
                  className="inline-block px-2 py-2 bg-green-500 text-white font-light rounded-lg hover:bg-green-600"
                >
                  Add Cart
                </Link>
                <Link to="#order"
                  className="inline-block px-2 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
                >
                  Order Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuDetail;
