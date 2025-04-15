import React, { useState, useEffect } from 'react';
import { getCart } from '../services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import { RiSecurePaymentFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [cartData, setCartData] = useState([]);
  // const [shippingDetails, setShippingDetails] = useState({
  //   name: '',
  //   address: '',
  //   city: '',
  //   zip: '',
  //   phone: '',
  // });
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const data = await getCart();
        setCartData(data);

        const total = data.reduce((acc, item) => acc + item.food.price * item.quantity, 0);
        setTotalAmount(total);
      } catch (error) {
        toast.error('Failed to load cart data.',error);
      }
    };

    fetchCartData();
  }, []);

  // const handleShippingDetailsChange = (e) => {
  //   const { name, value } = e.target;
  //   setShippingDetails((prevDetails) => ({
  //     ...prevDetails,
  //     [name]: value,
  //   }));
  // };

  const handlePlaceOrder = () => {
    // const { name, address, city, zip, phone } = shippingDetails;

    // if (!name || !address || !city || !zip || !phone) {
    //   toast.error('Please fill in all the shipping details.');
    //   return;
    // }
    toast.success('Order placed successfully!');
    navigate('/order-confirmation');
  };

  return (
    <div className="min-h-screen bg-[#F8F5F2] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white p-6 md:p-10 rounded-xl shadow-2xl mt-20">
        <h2 className="text-4xl font-extrabold text-center text-[#3B2F2F] mb-8">Checkout</h2>
        {/* <div className="mb-10">
          <h3 className="text-2xl font-semibold text-[#A47148] mb-6">Shipping Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={shippingDetails.name}
              onChange={handleShippingDetailsChange}
              placeholder="Full Name"
              className="p-3 rounded-md border border-[#D6CFC7] w-full bg-[#FAF9F7] placeholder:text-gray-500"
            />
            <input
              type="text"
              name="address"
              value={shippingDetails.address}
              onChange={handleShippingDetailsChange}
              placeholder="Address"
              className="p-3 rounded-md border border-[#D6CFC7] w-full bg-[#FAF9F7]"
            />
            <input
              type="text"
              name="city"
              value={shippingDetails.city}
              onChange={handleShippingDetailsChange}
              placeholder="City"
              className="p-3 rounded-md border border-[#D6CFC7] w-full bg-[#FAF9F7]"
            />
            <input
              type="text"
              name="zip"
              value={shippingDetails.zip}
              onChange={handleShippingDetailsChange}
              placeholder="ZIP Code"
              className="p-3 rounded-md border border-[#D6CFC7] w-full bg-[#FAF9F7]"
            />
            <input
              type="text"
              name="phone"
              value={shippingDetails.phone}
              onChange={handleShippingDetailsChange}
              placeholder="Phone Number"
              className="p-3 rounded-md border border-[#D6CFC7] w-full bg-[#FAF9F7] md:col-span-2"
            />
          </div>
        </div> */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-[#A47148] mb-6">Cart Summary</h3>
          <div className="space-y-4">
            {cartData.length > 0 ? (
              cartData.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row md:justify-between md:items-center bg-[#FFF7EF] p-4 rounded-lg shadow-md"
                >
                  <div className="flex items-center gap-4 mb-2 md:mb-0">
                    <img
                      src={`http://localhost:8000${item.food.image}`}
                      alt={item.food.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <span className="text-md font-semibold text-[#3B2F2F]">{item.food.name}</span>
                  </div>
                  <span className="text-sm font-medium text-[#3B2F2F]">
                    ₹{item.food.price} x {item.quantity} = ₹{item.food.price * item.quantity}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-700">Your cart is empty.</div>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 border-t pt-6 gap-4">
          <div className="text-2xl font-bold text-[#3B2F2F]">Total: ₹{totalAmount}</div>
          <button
            onClick={handlePlaceOrder}
            className="flex items-center gap-2 py-3 px-6 bg-[#D9A066] text-white text-lg rounded-lg hover:bg-[#c28d4c] transition duration-300"
          >
            <RiSecurePaymentFill size={22} />
            Place Order
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CheckoutPage;
