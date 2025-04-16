import React, { useEffect, useState } from 'react';
import { getMenuDetail, addCart } from '../services/apiService';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { IoIosStarHalf, IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";

const MenuDetail = () => {
  const { id } = useParams();
  const [menuItem, setMenuDetail] = useState([]);
  const [foodItem, setFoodDetail] = useState([]);
  const [quantities, setQuantities] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const getDetail = async (id) => {
      try {
        const data = await getMenuDetail(id);
        setMenuDetail(data);
        setFoodDetail(data.foods);
      } catch (error) {
        toast.error("Something went wrong", error);
      }
    };
    if (id) getDetail(id);
  }, [id]);

  const handleQuantityChange = (foodId, value) => {
    setQuantities({
      ...quantities,
      [foodId]: Math.max(1, parseInt(value) || 1),
    });
  };

  const handleIncreaseQuantity = (foodId) => {
    setQuantities({
      ...quantities,
      [foodId]: (quantities[foodId] || 1) + 1,
    });
  };

  const handleDecreaseQuantity = (foodId) => {
    setQuantities({
      ...quantities,
      [foodId]: Math.max(1, (quantities[foodId] || 1) - 1),
    });
  };

  const handleAddToCart = async (foodId) => {
    const quantity = quantities[foodId] || 1;
    const data = { food: foodId, quantity };
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

  return (
    <section className="py-12 px-4 bg-gray-100">
      <div className="max-w-7xl mx-auto mt-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{menuItem.name}</h2>

        <img
          src={`http://localhost:8000/${menuItem.image}`}
          alt={menuItem.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
        />

        <p className="text-lg md:text-xl font-medium text-gray-800 mb-6">{menuItem.description}</p>

        <hr className="border-t-2 border-green-500 mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 xl:grid-cols-6 gap-6">
          {foodItem.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <img
                src={`http://localhost:8000/${item.image}`}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              <div className="text-left space-y-1 mb-3">
                <p className="text-sm truncate"><strong>Name:</strong> {item.name}</p>
                <p className="text-sm truncate"><strong>Price:</strong>₹ {item.price}</p>
                <p className="text-sm"><strong>Cuisine:</strong> {item.cuisine_type}</p>
                <p className="text-sm flex items-center">
                  <strong>Type:</strong>
                  <span className={`ml-2 w-3 h-3 rounded-full ${item.is_vegetarian ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="ml-1 truncate">{item.is_vegetarian ? 'Vegetarian' : 'Non-Vegetarian'}</span>
                </p>
                <p className="text-sm flex items-center">
                  <strong>Rating:</strong>
                  <span className="ml-1">{item.rating}</span>
                  <IoIosStarHalf className="ml-1 text-green-500" />
                </p>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecreaseQuantity(item.id)}
                    className="text-xl text-gray-600 hover:text-gray-800"
                  >
                    <IoIosRemoveCircle />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantities[item.id] || 1}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    className="w-12 text-center py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={() => handleIncreaseQuantity(item.id)}
                    className="text-xl text-gray-600 hover:text-gray-800"
                  >
                    <IoIosAddCircle />
                  </button>
                </div>
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
