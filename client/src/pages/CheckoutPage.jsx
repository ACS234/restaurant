import React, { useState, useEffect } from 'react';
import { getCart } from '../services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import { RiSecurePaymentFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [cartData, setCartData] = useState([]);
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    phone: '',
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const data = await getCart();
        setCartData(data);

        // Calculate the total amount
        const total = data.reduce((acc, item) => acc + item.food.price * item.quantity, 0);
        setTotalAmount(total);
      } catch (error) {
        toast.error('Failed to load cart data.',error);
      }
    };

    fetchCartData();
  }, []);

  const handleShippingDetailsChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.city || !shippingDetails.zip || !shippingDetails.phone) {
      toast.error('Please fill in all the shipping details.');
      return;
    }

    // Send the order details to the backend (order creation)
    toast.success('Order placed successfully!');
    navigate('/order-confirmation'); // Redirect to an Order Confirmation Page (or any other page)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-7xl w-full bg-white p-8 rounded-lg shadow-xl mt-20">
        <h2 className="text-2xl font-bold text-center mb-6">Checkout</h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={shippingDetails.name}
              onChange={handleShippingDetailsChange}
              placeholder="Full Name"
              className="p-2 rounded-md border border-gray-300"
            />
            <input
              type="text"
              name="address"
              value={shippingDetails.address}
              onChange={handleShippingDetailsChange}
              placeholder="Address"
              className="p-2 rounded-md border border-gray-300"
            />
            <input
              type="text"
              name="city"
              value={shippingDetails.city}
              onChange={handleShippingDetailsChange}
              placeholder="City"
              className="p-2 rounded-md border border-gray-300"
            />
            <input
              type="text"
              name="zip"
              value={shippingDetails.zip}
              onChange={handleShippingDetailsChange}
              placeholder="ZIP Code"
              className="p-2 rounded-md border border-gray-300"
            />
            <input
              type="text"
              name="phone"
              value={shippingDetails.phone}
              onChange={handleShippingDetailsChange}
              placeholder="Phone Number"
              className="p-2 rounded-md border border-gray-300"
            />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Cart Summary</h3>
          <div className="space-y-4">
            {cartData.length > 0 ? (
              cartData.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <img
                      src={`http://localhost:8000${item.food.image}`}
                      alt={item.food.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <span className="ml-4 text-md font-semibold">{item.food.name}</span>
                  </div>
                  <span className="text-sm font-medium">
                    ₹{item.food.price} x {item.quantity} = ₹{item.food.price * item.quantity}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-700">Your cart is empty.</div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-8 border-t pt-4">
          <div className="text-xl font-semibold">Total: ₹{totalAmount}</div>
          <button
            onClick={handlePlaceOrder}
            className="flex items-center gap-2 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700"
          >
            <RiSecurePaymentFill size={20} />
            Place Order
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CheckoutPage;
