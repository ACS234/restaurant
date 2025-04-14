import React, { useEffect, useState } from 'react';
import { IoIosCart } from 'react-icons/io';
import { getCart } from '../services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import { RiSecurePaymentFill } from "react-icons/ri";


const AddToCart = () => {
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const data = await getCart();
                console.log('Fetched cart data:', data)
                setCartData(data);
            } catch (error) {
                toast.error('Failed to load cart items.');
                console.error(error);
            }
        };

        fetchCarts();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-2">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {cartData.map((item) => (
                    <div key={item.id} className="max-w-sm mt-20 bg-green-300 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-200 p-4 transform hover:scale-[1.02]">
                        <div className="mb-2">
                            <h2 className="text-md font-bold text-gray-800">Name: {(item.food.name).substring(0,15)}...</h2>
                        </div>
                        <div className="mb-1">
                            <img className="w-60 h-40 object-cover rounded-lg mb-2" src={`http://localhost:8000${item.food.image}`} alt={item.food.name} />
                        </div>
                        <div className="mb-1">
                            <p className="text-lg font-semibold text-green-700">
                                Price: ₹{item.food.price}
                            </p>
                        </div>

                        <div className="mb-1">
                            <label className="text-sm font-medium text-gray-700">Quantity: {item.quantity}</label>
                        </div>
                        <button
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium text-white transition duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                        >
                           <RiSecurePaymentFill size={20} />
                            Order/Checkout
                        </button>
                    </div>
                ))}
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default AddToCart;
