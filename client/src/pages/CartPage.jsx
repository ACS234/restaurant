// import React, { useEffect, useState } from 'react';
// import { IoIosCart } from 'react-icons/io';
// import { FiPlus, FiMinus } from 'react-icons/fi';
// import { FaTrash } from "react-icons/fa";
// import { getCart, removeCart, updateCart } from '../services/apiServices';
// import { toast, ToastContainer } from 'react-toastify';
// import { RiSecurePaymentFill } from "react-icons/ri";
// import { TbArrowBackUp } from "react-icons/tb";
// import { useNavigate } from 'react-router-dom';
// import CheckoutPage from './CheckoutPage';
// import PaymentPage from './PaymentPage';

// const AddToCart = () => {
//   const [cartData, setCartData] = useState([]);
//   const navigate = useNavigate();

//   const fetchCarts = async () => {
//     try {
//       const data = await getCart();
//       setCartData(data);
//     } catch (error) {
//       toast.error('Failed to load cart items.');
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchCarts();
//   }, []);

//   const totalAmount = cartData.reduce((sum, item) => sum + item?.food?.price * item.quantity, 0);

//   const handleQuantityChange = async (itemId, delta) => {
//     const item = cartData.find((item) => item.id === itemId);
//     if (!item) return;

//     const newQuantity = Math.max(1, item.quantity + delta);
//     try {
//       await updateCart(itemId, { quantity: newQuantity });
//       fetchCarts();
//     } catch (error) {
//       toast.error('Failed to update quantity.');
//       console.error('Quantity update error:', error);
//     }
//   };

//   console.log("cartdata",cartData)

//   const removeCartItem = async (id) => {
//     try {
//       await removeCart(id);
//       setCartData((prevCart) => prevCart.filter(item => item.id !== id));
//       toast.success('Item removed successfully.');
//     } catch (error) {
//       toast.error(`Failed to remove item with ID ${id}.`);
//       console.error(error);
//     }
//   };

//   const handleMenu = () => {
//     navigate('/menu');
//   };

//   return (
//     <>
//     <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 sm:p-6 flex justify-center">
//       <div className="w-full max-w-7xl flex flex-col md:flex-row gap-6 mt-20">
//         <div className="w-full md:w-2/3 bg-white shadow-xl rounded-xl p-4 sm:p-6">
//           <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
//             <IoIosCart size={28} /> Your Cart ({cartData.length})
//           </h2>
//           {cartData.length > 0 ? (
//             <div className="space-y-6">
//               {cartData.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex items-center gap-4 border-b pb-4 overflow-x-auto px-2"
//                 >
//                   <img
//                     src={`http://localhost:8000${item?.food?.image}`}
//                     alt={item.food.name}
//                     className="min-w-[80px] w-20 h-20 object-cover rounded-lg"
//                   />

//                   <div className="min-w-[140px] flex-1">
//                     <h3 className="font-semibold text-gray-800 text-base">{item?.food?.name}</h3>
//                     <p className="text-sm text-gray-600">Price: ₹{item?.food?.price}</p>
//                   </div>

//                   <div className="min-w-[120px] flex items-center gap-2">
//                     <button
//                       onClick={() => handleQuantityChange(item.id, -1)}
//                       className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
//                       disabled={item.quantity <= 1}
//                     >
//                       <FiMinus />
//                     </button>
//                     <span className="font-medium px-2">{item?.quantity}</span>
//                     <button
//                       onClick={() => handleQuantityChange(item.id, 1)}
//                       className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
//                     >
//                       <FiPlus />
//                     </button>
//                   </div>

//                   <div className="min-w-[90px] text-right">
//                     <span className="text-xs text-gray-500 block">Total</span>
//                     <p className="text-green-600 font-semibold">
//                       ₹{item?.total_price}
//                     </p>
//                   </div>

//                   <button
//                     onClick={() => removeCartItem(item.id)}
//                     className="flex justify-center cursor-pointer min-w-[40px] gap-4 items-center rounded-full size-10"
//                   >
//                     <FaTrash color='red' />
//                   </button>
//                 </div>
//               ))}
//               <div className="flex justify-end text-2xl font-bold text-[#443c3c]">Total: ₹{totalAmount}</div>
//             </div>
//           ) : (
//             <div className="text-center text-gray-700 py-20">
//               <h3 className="text-xl font-semibold">Your Cart is Empty</h3>
//               <p>Add items to your cart to proceed with the order.</p>
//               <button
//                 onClick={handleMenu}
//                 className="inline-flex items-center gap-2 py-3 px-6 mt-4 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
//               >
//                 <TbArrowBackUp size={20} />
//                 Explore Menu
//               </button>
//             </div>
//           )}
//         </div>
//         <div className="w-full md:w-1/3 rounded-xl p-4 sm:p-6">
//           <PaymentPage cartData={cartData} totalAmount={totalAmount} />
//         </div>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//     {/* <div className='bg-gradient-to-br from-orange-50 to-orange-200'>
//     <PaymentPage cartData={cartData}  totalAmount={totalAmount}/>
//     </div> */}
//     </>
//   );
// };

// export default AddToCart;


import React, { useEffect, useState } from 'react';
import { IoIosCart } from 'react-icons/io';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import { getCart, removeCart, updateCart } from '../services/apiServices';
import { toast, ToastContainer } from 'react-toastify';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { TbArrowBackUp } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import CheckoutPage from './CheckoutPage';
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
      fetchCarts();
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
      toast.error(`Failed to remove item with ID ${id}.`);
      console.error(error);
    }
  };

  const handleMenu = () => {
    navigate('/menu');
  };

  return (
    <>
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-2 sm:p-6 flex justify-center">
        <div className="w-full max-w-7xl flex flex-col md:flex-row gap-2 mt-20">
          <div className="w-full md:w-2/3 bg-white rounded-md p-2 sm:p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
              <IoIosCart size={28} /> Your Cart ({cartData.length})
            </h2>
            {cartData.length > 0 ? (
              <div className="space-y-6">
                {cartData.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b pb-4 overflow-x-auto px-2"
                  >
                    <img
                      src={`http://localhost:8000${item?.food?.image}`}
                      alt={item.food.name}
                      className="min-w-[80px] w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="min-w-[140px] flex-1">
                      <h3 className="font-semibold text-gray-800 text-base">
                        {item?.food?.name}
                      </h3>
                      <p className="text-sm text-gray-600">Price: ₹{item?.food?.price}</p>
                    </div>

                    <div className="min-w-[120px] flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                        disabled={item.quantity <= 1}
                      >
                        <FiMinus />
                      </button>
                      <span className="font-medium px-2">{item?.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <div className="min-w-[90px] text-right">
                      <span className="text-xs text-gray-500 block">Total</span>
                      <p className="text-green-600 font-semibold">
                        ₹{item?.total_price}
                      </p>
                    </div>

                    <button
                      onClick={() => removeCartItem(item.id)}
                      className="flex justify-center cursor-pointer min-w-[40px] gap-4 items-center rounded-full size-10"
                    >
                      <FaTrash color="red" />
                    </button>
                  </div>
                ))}
                <div className="flex justify-end text-2xl font-bold text-[#443c3c]">
                  Total: ₹{totalAmount}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-700 py-20">
                <h3 className="text-xl font-semibold">Your Cart is Empty</h3>
                <p>Add items to your cart to proceed with the order.</p>
                <button
                  onClick={handleMenu}
                  className="inline-flex items-center gap-2 py-3 px-6 mt-4 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                >
                  <TbArrowBackUp size={20} />
                  Explore Menu
                </button>
              </div>
            )}
          </div>
          <div className="w-full bg-amber-300 md:w-2/3 rounded-md p-2 m-1 sm:p-6">
            <PaymentPage cartData={cartData} totalAmount={totalAmount} />
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
};

export default AddToCart;
