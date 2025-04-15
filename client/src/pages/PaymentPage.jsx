import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount, cartData } = location.state || {};

  const handlePayment = async () => {
    try {
      // replace this with your actual API endpoint
      const response = await axios.post('http://localhost:8000/api/payments/', {
        amount: totalAmount,
        items: cartData.map(item => ({
          id: item.food.id,
          quantity: item.quantity,
        })),
        method: "card", 
      });

      if (response.data.success) {
        toast.success("Payment Successful!");
        navigate('/order-confirmation');
      } else {
        toast.error("Payment Failed. Please try again.");
      }
    } catch (error) {
      toast.error("Error processing payment.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F2] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-2xl mt-20">
        <h2 className="text-3xl font-bold text-center text-[#3B2F2F] mb-6">Payment</h2>

        <div className="mb-6">
          <p className="text-lg text-[#3B2F2F] font-semibold mb-2">Total Amount:</p>
          <div className="text-2xl font-bold text-[#A47148]">₹{totalAmount}</div>
        </div>

        {/* Optional: Add card or UPI method selection */}
        <div className="mb-6">
          <label className="block text-[#3B2F2F] font-medium mb-2">Payment Method</label>
          <select className="w-full p-3 border border-gray-300 rounded-md">
            <option value="card">Credit/Debit Card</option>
            <option value="upi">UPI</option>
            <option value="cod" disabled>Cash on Delivery (Unavailable)</option>
          </select>
        </div>

        <button
          onClick={handlePayment}
          className="w-full py-3 bg-[#D9A066] text-white text-lg rounded-lg hover:bg-[#c28d4c] transition duration-300"
        >
          Pay ₹{totalAmount}
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PaymentPage;
