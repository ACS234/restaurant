import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { getRestaurant, orderPayment } from '../services/apiServices';
import useCurrentUser from '../hooks/useUser';

const PaymentPage = ({ cartData, totalAmount }) => {
  const {user}=useCurrentUser();
  const [restaurantId, setRestaurantId] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('Cash');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    customerContact: '',
    address: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurant();
        setRestaurantId(data[0]);
      } catch (error) {
        toast.error('Failed to load restaurant.');
        console.error(error);
      }
    };

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
    console.log("id",user.id)

    try {
      const data = await orderPayment({
        user_id:user.id,
        amount: totalAmount,
        payment_method: selectedMethod,
        address: selectedMethod === 'Cash' ? 'Cash on counter - No delivery' : formData.address,
        customer_name: formData?.customerName,
        customer_contact: formData?.customerContact,
        order: cartData.map(item => ({
          id: item.food.id,
          quantity: item.quantity,
        })),
        restaurant_id: restaurantId?.id,
      });
      if(data){
        toast.success(data?.message)
        setTimeout(()=>{
          navigate('/order-confirmation')
        },2000)
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong!');
    }
    
  };

  const isDelivery = selectedMethod !== 'Cash';

  return (
    <div className="w-full p-6 bg-gradient-to-br from-amber-50 to-white rounded-lg shadow-lg">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-[#443c3c] mb-8">Secure Payment</h2>

      <div className="flex flex-col gap-6">
        <div className="text-center text-xl sm:text-2xl font-semibold text-[#6b4c3b]">
          Total: <span className="text-[#db9742] font-bold">₹{totalAmount}</span>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Full Name"
            className="px-4 py-3 bg-[#fef9f6] border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#db9742]"
          />

          <input
            type="tel"
            name="customerContact"
            value={formData.customerContact}
            onChange={handleChange}
            placeholder="10-digit Contact Number"
            maxLength={10}
            className="px-4 py-3 bg-[#fef9f6] border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#db9742]"
          />

          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="px-4 py-3 bg-[#fef9f6] border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#db9742]"
          >
            <option value="Cash">Cash (Pay at Counter)</option>
            <option value="Credit Card">Credit Card</option>
            <option value="UPI">UPI</option>
            <option value="Wallet">Wallet</option>
          </select>

          {isDelivery && (
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              placeholder="Delivery Address"
              className="px-4 py-3 bg-[#fef9f6] border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#db9742]"
            ></textarea>
          )}
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className={`w-full py-4 mt-4 text-lg font-bold rounded-xl transition duration-300 ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#db9742] to-[#b87b30] hover:from-[#ca8537] hover:to-[#a46324] text-white'
          }`}
        >
          {isProcessing ? 'Processing...' : `Pay ₹${totalAmount}`}
        </button>
      </div>

      {/* Toast */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PaymentPage;
