import React, { useEffect, useState } from 'react';
import { getMenuDetail, addCart } from '../services/apiService';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { IoIosStarHalf, IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { TbArrowBackUp } from "react-icons/tb";

const MenuDetail = () => {
  const { id } = useParams();
  const [menuItem, setMenuDetail] = useState([]);
  const [foodItem, setFoodDetail] = useState([]);
  const [restaurantName, setRestaurantName] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getDetail = async (id) => {
      try {
        const data = await getMenuDetail(id);
        setMenuDetail(data);
        setFoodDetail(data.foods);
        setRestaurantName(data.restaurant);
      } catch (error) {
        toast.error("Something went wrong", error);
      }
    };
    if (id) getDetail(id);
  }, [id]);

 
  const handleAddToCart = async (foodId) => {
    const data = { food: foodId };
    const result = await addCart(data);
    if (result) {
      toast.success("Item added to cart!");
      navigate('/cart');
    }
  };

  const handleOrder=()=>{
    toast.success("go to order page")
    navigate('/order')
  }

  const handleBack=()=>{
    navigate("/menu")
  }

  return (
    <section className="py-12 px-4 bg-gray-100">
      
      <div className="max-w-7xl mx-auto mt-20">
      <button
        onClick={()=>{handleBack()}}
          className="px-4 py-2 bg-gray-500 cursor-pointer text-white text-xs rounded hover:bg-gray-600"
        >
          <TbArrowBackUp size={20} />
        </button>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{menuItem.name}</h2>

        <img
          src={`http://localhost:8000${menuItem.image}`}
          alt={menuItem.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
        />

        <p className="text-lg md:text-xl font-medium text-gray-800 mb-6">{menuItem.description}</p>

        <hr className="border-t-2 border-green-500 mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {foodItem.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <img
                src={`http://localhost:8000/media/${item.image}`}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              <div className="text-left space-y-1 mb-3">
                <p className="text-sm truncate"><strong>Name:</strong> {item.name}|{restaurantName.name}</p>
                <p className="text-sm truncate"><strong>Price:</strong>₹ {item.price}</p>
                <p className="text-sm flex items-center">
                  <strong>Type:</strong>
                  <span className={`ml-2 w-3 h-3 rounded-full ${item.is_vegetarian ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </p>
                <p className="text-sm flex items-center">
                  <strong>Rating:</strong>
                  <span className="ml-1">{item.rating}</span>
                  <IoIosStarHalf className="ml-1 text-green-500" />
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => handleAddToCart(item.id)}
                  className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                >
                  Add to Cart
                </button>
                <button
                onClick={()=>{handleOrder()}}
                  className="px-2 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600"
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MenuDetail;
