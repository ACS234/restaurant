import React, { useEffect, useState } from 'react';
import { IoIosCart } from 'react-icons/io';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import { getCart, removeCart, updateCart } from '../services/apiServices';
import { toast, ToastContainer } from 'react-toastify';
import { TbArrowBackUp } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import PaymentPage from './PaymentPage';

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

  const totalAmount = cartData.reduce(
    (sum, item) => sum + item?.food?.price * item.quantity,
    0
  );

  const handleQuantityChange = async (itemId, delta) => {
    const item = cartData.find((item) => item.id === itemId);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);
    try {
      await updateCart(itemId, { quantity: newQuantity });
      await fetchCarts();
    } catch (error) {
      toast.error('Failed to update quantity.');
      console.error('Quantity update error:', error);
    }
  };

  const removeCartItem = async (id) => {
    try {
      await removeCart(id);
      setCartData((prevCart) => prevCart.filter((item) => item.id !== id));
      toast.success('Item removed successfully.');
    } catch (error) {
      toast.error(`Failed to remove item.`);
      console.error(error);
    }
  };

  const handleMenu = () => {
    navigate('/menu');
  };

  const handleGotoFood = () => {
    navigate('/foods');
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 px-4 py-8">
      <div className="w-full md:w-2/3 bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-8">
          <IoIosCart size={30} className="text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-800">Your Cart ({cartData.length})</h2>
        </div>

        {cartData.length > 0 ? (
          <>
            <div className="flex flex-col gap-6">
              {cartData.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gray-100 rounded-xl hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={`http://localhost:8000${item?.food?.image}`}
                      alt={item?.food?.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{item?.food?.name}</h3>
                      <p className="text-gray-500 text-sm">Price: ₹{item?.food?.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="bg-white border border-gray-300 p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span className="text-lg font-medium">{item?.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="bg-white border border-gray-300 p-2 rounded-full hover:bg-gray-200"
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-sm text-gray-500 block">Total</span>
                    <p className="text-green-600 font-bold text-lg">₹{item?.total_price}</p>
                  </div>

                  <button
                    onClick={() => removeCartItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-10">
              <div className="text-right">
                <h3 className="text-xl font-bold text-gray-800">Total Amount</h3>
                <p className="text-2xl text-green-600 font-bold">₹{totalAmount}</p>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleGotoFood}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-6 rounded-full text-lg font-medium shadow-md"
              >
                <TbArrowBackUp size={22} />
                Add More Items
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              className="w-40 h-40 mb-6 opacity-80"
            />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">Your Cart is Empty</h3>
            <p className="text-gray-500 mb-6 text-center">Looks like you haven't added anything yet.</p>
            <button
              onClick={handleMenu}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-6 rounded-full text-lg font-medium shadow-md"
            >
              <TbArrowBackUp size={22} />
              Explore Menu
            </button>
          </div>
        )}
      </div>

      {cartData.length > 0 && (
        <div className="w-full md:w-2/3 mt-8 bg-amber-100 rounded-2xl p-6 shadow-lg">
          <PaymentPage cartData={cartData} totalAmount={totalAmount} />
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddToCart;

