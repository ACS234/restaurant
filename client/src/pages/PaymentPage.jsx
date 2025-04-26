import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
      const { data, success } = await orderPayment({
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
    
      console.log('Payment response:', data);
    
      if (success) {
        toast.success(data.message || 'Payment successful!');
        setTimeout(() => navigate('/order-confirmation'), 2000);
      } else {
        toast.error(data?.error || 'Payment failed.');
      }
    
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error?.data?.error || 'Something went wrong!');
    } finally {
      setIsProcessing(false);
    }
  }    

  const isDeliveryMethod = selectedMethod !== 'Cash';

  return (
    <>
        <h2 className="text-4xl font-extrabold text-center text-[#4B3E2F] mb-8">Secure Payment</h2>
        <div className="text-center text-2xl mb-6 text-[#4B3E2F]">
          Total Amount: <span className="font-bold text-[#B47A4E]">₹{totalAmount}</span>
        </div>
        <div className="w-full space-y-3">
          <div>
            <label className="block mb-2 font-medium text-[#4B3E2F]">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full px-2 py-2 border border-gray-300 rounded-xl bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#D9A066]"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#4B3E2F]">Contact Number</label>
            <input
              type="tel"
              name="customerContact"
              value={formData.customerContact}
              onChange={handleChange}
              maxLength={10}
              className="w-full px-2 py-2 border border-gray-300 rounded-xl bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#D9A066]"
              placeholder="10-digit mobile number"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#4B3E2F]">Select Payment Method</label>
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="w-full px-2 py-2 border border-gray-300 rounded-xl bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#D9A066]"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="UPI">UPI</option>
              <option value="Wallet">Wallet</option>
              <option value="Cash">Cash (Pay at Counter)</option>
            </select>
          </div>

          {isDeliveryMethod && (
            <div>
              <label className="block mb-2 font-medium text-[#4B3E2F]">Delivery Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full px-2 py-2 border border-gray-300 rounded-xl bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#D9A066]"
                placeholder="Enter delivery address"
              />
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={`w-full py-4 mt-4 text-xl font-semibold rounded-xl transition duration-300 ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#D9A066] text-white hover:bg-[#c28d4c]'
            }`}
          >
            {isProcessing ? 'Processing...' : `Pay ₹${totalAmount}`}
          </button>
        </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default PaymentPage;
