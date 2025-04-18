import React, { useEffect, useState } from 'react';
import { getFoods, addCart } from '../services/apiServices'; 
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const FoodPage = () => {
    const [foods, setFoods] = useState([]);
    const navigate = useNavigate();

    const fetchFoods = async () => {
        try {
            const data = await getFoods();
            setFoods(data);
        } catch (error) {
            toast.error('Failed to load foods.',error.message);
        } 
    };
    useEffect(() => {
        fetchFoods();
    }, []);

    const handleAddToCart = async (foodId) => {
        try {
            const result = await addCart({ food: foodId });
            if (result) {
                toast.success("Item added to cart!");
                setTimeout(() => {
                    navigate('/cart');
                }, 2000);
            }
        } catch (error) {
            toast.error("Failed to add item to cart.");
            console.error(error);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <ToastContainer />
            <section className="py-8 px-2">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Our Menu</h2>
                    <hr className="mb-6 border-t border-gray-300" />
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {foods.map((menuItem) => (
                            <div key={menuItem.id} className="bg-white p-3 rounded-md shadow text-sm">
                                <img
                                    src={`http://localhost:8000/${menuItem.image}`}
                                    alt={menuItem.name}
                                    className="w-full h-80 sm:h-40 md:h-40 object-cover rounded mb-2"
                                />
                                <h3 className="font-semibold text-sm mb-1">{menuItem.name} | {menuItem.restaurants[0].name }</h3>
                                <p className="text-gray-600 mb-1 truncate">{menuItem.description}</p>
                                <div className="mb-1">
                                    <span className="font-semibold text-yellow-500">Rating:</span> {menuItem.rating} / 5
                                </div>
                                <p><strong>Price:</strong> ₹{menuItem.price}</p>
                                <button
                                    onClick={() => handleAddToCart(menuItem.id)}
                                    className="mt-3 w-full py-1 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600 text-xs"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FoodPage;
