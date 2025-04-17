import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { getRestaurant, orderPayment } from '../services/apiService';

const PaymentPage = ({ cartData, totalAmount }) => {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(null)

  const [selectedMethod, setSelectedMethod] = useState('Credit Card');
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchRestaurants = async () => {
    try {
      const data = await getRestaurant();
      setRestaurantId(data[0]);
    } catch (error) {
      toast.error('Failed to load restaurant.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handlePayment = async () => {
    if (!cartData || cartData.length === 0) {
      toast.error('Cart is empty. Cannot proceed with payment.');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await orderPayment({
        amount: totalAmount,
        payment_method: selectedMethod,
        order: cartData.map(item => ({
          id: item.food.id,
          quantity: item.quantity,
        })),
        restaurant_id: restaurantId?.id,
      });

      if (response.data.success) {
        toast.success('Order and payment processed!');
        setTimeout(() => navigate('/order-confirmation'), 2000);
      } else {
        toast.error('Payment failed.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-xl w-full max-w-3xl shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-6">Payment</h2>

      <div className="text-center text-xl mb-6 text-[#3B2F2F]">
        Total Amount: <span className="font-semibold text-[#A47148]">₹{totalAmount}</span>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium text-[#3B2F2F]">Select Payment Method</label>
        <select
          value={selectedMethod}
          onChange={(e) => setSelectedMethod(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-[#FAF9F7]"
        >
          <option value="Credit Card">Credit Card</option>
          <option value="UPI">UPI</option>
          <option value="Cash">Cash</option>
          <option value="Wallet">Wallet</option>
        </select>
      </div>

      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className="w-full py-3 bg-[#D9A066] text-white text-lg rounded-lg hover:bg-[#c28d4c] transition duration-300"
      >
        {isProcessing ? 'Processing...' : `Pay ₹${totalAmount}`}
      </button>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PaymentPage;
