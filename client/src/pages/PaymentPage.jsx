import React, { useState, useEffect } from 'react';
import { data, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { getRestaurant, orderPayment } from '../services/apiServices';

const PaymentPage = ({ cartData, totalAmount }) => {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('Credit Card');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    customerContact: '',
    address: '',
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    if (!cartData || cartData.length === 0) {
      toast.error('Cart is empty. Cannot proceed with payment.');
      return;
    }

    if (!formData.customerName.trim()) {
      toast.error('Please enter your name.');
      return;
    }

    if (!formData.customerContact.trim() || !/^\d{10}$/.test(formData.customerContact)) {
      toast.error('Please enter a valid 10-digit contact number.');
      return;
    }

    if (selectedMethod !== 'Cash' && !formData.address.trim()) {
      toast.error('Please enter a delivery address.');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await orderPayment({
        amount: totalAmount,
        payment_method: selectedMethod,
        address: selectedMethod === 'Cash' ? 'Cash on counter - No delivery' : formData.address,
        customer_name: formData.customerName,
        customer_contact: formData.customerContact,
        order: cartData.map(item => ({
          id: item.food.id,
          quantity: item.quantity,
        })),
        restaurant_id: restaurantId?.id,
      });

      if (response.data.success) {
        toast.success(data.message);
        setTimeout(() => navigate('/order-confirmation'), 2000);
      } else {
        toast.error('Payment failed.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const isDeliveryMethod = selectedMethod !== 'Cash';

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-xl w-full max-w-3xl shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-6">Payment</h2>

      <div className="text-center text-xl mb-6 text-[#3B2F2F]">
        Total Amount: <span className="font-semibold text-[#A47148]">₹{totalAmount}</span>
      </div>

      <div className="mb-4 w-full">
        <label className="block mb-2 font-medium text-[#3B2F2F]">Customer Name</label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md bg-[#FAF9F7]"
          placeholder="Your full name"
        />
      </div>
      <div className="mb-4 w-full">
        <label className="block mb-2 font-medium text-[#3B2F2F]">Contact Number</label>
        <input
          type="tel"
          name="customerContact"
          value={formData.customerContact}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md bg-[#FAF9F7]"
          placeholder="10-digit mobile number"
          maxLength={10}
        />
      </div>

      <div className="mb-6 w-full">
        <label className="block mb-2 font-medium text-[#3B2F2F]">Select Payment Method</label>
        <select
          value={selectedMethod}
          onChange={(e) => setSelectedMethod(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-[#FAF9F7]"
        >
          <option value="Credit Card">Credit Card</option>
          <option value="UPI">UPI</option>
          <option value="Wallet">Wallet</option>
          <option value="Cash">Cash (Pay at Counter)</option>
        </select>
      </div>

      {isDeliveryMethod && (
        <div className="mb-6 w-full">
          <label className="block mb-2 font-medium text-[#3B2F2F]">Delivery Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-md bg-[#FAF9F7]"
            placeholder="Enter your full address"
          />
        </div>
      )}

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
