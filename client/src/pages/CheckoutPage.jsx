import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiSecurePaymentFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartData = location.state?.cartData || [];

  const totalAmount = cartData.reduce((sum, item) => sum + item.food.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!cartData.length) {
      toast.error('Your cart is empty.');
      return;
    }

    navigate('/payment', { state: { cartData, totalAmount } });
  };

  return (
    <div className="min-h-screen bg-[#F8F5F2] flex flex-col items-center p-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-2xl mt-20">
        <h2 className="text-4xl font-extrabold text-center text-[#3B2F2F] mb-8">Checkout</h2>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-6">Cart Summary</h3>
          <div className="space-y-4">
            {cartData.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-[#FFF7EF] p-4 rounded-lg shadow">
                <div className="flex gap-4 items-center">
                  <img src={`http://localhost:8000${item.food.image}`} className="w-16 h-16 object-cover rounded" />
                  <span>{item.food.name}</span>
                </div>
                <span>₹{item.food.price} × {item.quantity} = ₹{item?.total_price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-6">
          <div className="text-2xl font-bold text-[#3B2F2F]">Total: ₹{totalAmount}</div>
          <button onClick={handlePlaceOrder} className="bg-[#D9A066] text-white px-6 py-3 rounded-lg hover:bg-[#c28d4c] flex items-center gap-2">
            <RiSecurePaymentFill /> Place Order
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CheckoutPage;
