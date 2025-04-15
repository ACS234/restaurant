import React, { useEffect, useState } from 'react';
import { IoIosCart } from 'react-icons/io';
import { FiPlus, FiMinus, FiDelete } from 'react-icons/fi';
import { getCart, removeCart } from '../services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import { RiSecurePaymentFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const AddToCart = () => {
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  const fetchCarts = async () => {
    try {
      const data = await getCart();
      setCartData(data);
    } catch (error) {
      toast.error('Failed to load cart items.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  const handleQuantityChange = (itemId, delta) => {
    setCartData((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeCartItem = async (id) => {
    try {
      await removeCart(id);
      setCartData((prevCart) => prevCart.filter(item => item.id !== id));
      toast.success('Item removed successfully.');
    } catch (error) {
      toast.error(`Failed to remove item with ID ${id}.`);
      console.error(error);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-4 sm:p-6 mt-20">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
          <IoIosCart size={28} /> Your Cart ({cartData.length})
        </h2>

        {cartData.length > 0 ? (
          <div className="space-y-6">
            {cartData.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4 overflow-x-auto px-2"
              >
                {/* Image */}
                <img
                  src={`http://localhost:8000${item.food.image}`}
                  alt={item.food.name}
                  className="min-w-[80px] w-20 h-20 object-cover rounded-lg"
                />

                {/* Item Info */}
                <div className="min-w-[140px] flex-1">
                  <h3 className="font-semibold text-gray-800 text-base">{item.food.name}</h3>
                  <p className="text-sm text-gray-600">Price: ₹{item.food.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="min-w-[120px] flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <FiMinus />
                  </button>
                  <span className="font-medium px-2">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <FiPlus />
                  </button>
                </div>

                {/* Total */}
                <div className="min-w-[90px] text-right">
                  <span className="text-xs text-gray-500 block">Total</span>
                  <p className="text-green-600 font-semibold">
                    ₹{item.food.price * item.quantity}
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeCartItem(item.id)}
                  className="min-w-[40px] p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  <FiDelete />
                </button>
              </div>
            ))}

            {/* Checkout Button */}
            <div className="mt-6 text-center sm:text-right">
              <button
                onClick={handleCheckout}
                className="inline-flex items-center gap-2 py-3 px-6 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 w-full sm:w-auto"
              >
                <RiSecurePaymentFill size={20} />
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-700 py-20">
            <h3 className="text-xl font-semibold">Your Cart is Empty</h3>
            <p>Add items to your cart to proceed with the order.</p>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddToCart;
