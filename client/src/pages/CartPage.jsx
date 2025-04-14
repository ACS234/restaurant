// import React, { useEffect, useState } from 'react';
// import { IoIosCart } from 'react-icons/io';
// import { getCart } from '../services/apiService';
// import { toast, ToastContainer } from 'react-toastify';
// import { RiSecurePaymentFill } from "react-icons/ri";
// import { useNavigate } from 'react-router-dom';

// const AddToCart = () => {
//   const [cartData, setCartData] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCarts = async () => {
//       try {
//         const data = await getCart();
//         console.log('Fetched cart data:', data);
//         setCartData(data);
//       } catch (error) {
//         toast.error('Failed to load cart items.');
//         console.error(error);
//       }
//     };

//     fetchCarts();
//   }, []);

//   const handleCheckout = () => {
//     navigate('/checkout');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
//       <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {cartData.length > 0 ? (
//           cartData.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-200 transform hover:scale-[1.02] mb-8 mt-20"
//             >
//               <div className="mb-2">
//                 <h2 className="text-md font-bold text-gray-800 truncate">{item.food.name}</h2>
//               </div>
//               <div className="mb-2">
//                 <img
//                   className="w-full h-40 object-cover rounded-lg mb-2"
//                   src={`http://localhost:8000${item.food.image}`}
//                   alt={item.food.name}
//                 />
//               </div>
//               <div className="mb-2">
//                 <p className="text-lg font-semibold text-green-700">Price: ₹{item.food.price}</p>
//               </div>
//               <div className="mb-2">
//                 <label className="text-sm font-medium text-gray-700">Quantity: {item.quantity}</label>
//               </div>
//               <button
//                 onClick={handleCheckout}
//                 className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium text-white transition duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
//               >
//                 <RiSecurePaymentFill size={20} />
//                 Proceed to Checkout
//               </button>
//             </div>
//           ))
//         ) : (
//           <div className="text-center text-gray-700 col-span-full">
//             <h3 className="text-xl font-semibold">Your Cart is Empty</h3>
//             <p>Add items to your cart to proceed with the order.</p>
//           </div>
//         )}
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default AddToCart;

import React, { useEffect, useState } from 'react';
import { IoIosCart } from 'react-icons/io';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { getCart } from '../services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import { RiSecurePaymentFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const AddToCart = () => {
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const data = await getCart();
        console.log('Fetched cart data:', data);
        setCartData(data);
      } catch (error) {
        toast.error('Failed to load cart items.');
        console.error(error);
      }
    };

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

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col items-center p-6">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
          <IoIosCart size={28} /> Your Cart
        </h2>

        {cartData.length > 0 ? (
          <div className="space-y-4">
            {cartData.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <img
                  src={`http://localhost:8000${item.food.image}`}
                  alt={item.food.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.food.name}</h3>
                  <p className="text-sm text-gray-600">Price: ₹{item.food.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <FiMinus />
                  </button>
                  <span className="font-medium px-2">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <FiPlus />
                  </button>
                </div>
                <div className="w-28 text-right">
                  <p className="text-green-600 font-semibold">
                    ₹{item.food.price * item.quantity}
                  </p>
                  <span className="text-xs text-gray-500">Total</span>
                </div>
              </div>
            ))}

            <div className="mt-6 text-right">
              <button
                onClick={handleCheckout}
                className="inline-flex items-center gap-2 py-2.5 px-6 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
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
