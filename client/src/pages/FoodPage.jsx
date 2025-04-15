import React, { useEffect, useState } from 'react';
import { getFoods, addCart } from '../services/apiService'; 
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const FoodPage = () => {
    const navigate = useNavigate();

    const [foods, setFoods] = useState([]);
    const [quantities, setQuantities] = useState({});

    const fetchFoods = async () => {
        try {
            const data = await getFoods();
            console.log('Fetched food data:', data);
            setFoods(data);
        } catch (error) {
            toast.error('Failed to load foods.',error.message);
        } 
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    const handleQuantityChange = (foodId, value) => {
        setQuantities({
            ...quantities,
            [foodId]: Math.max(1, parseInt(value) || 1),
        });
    };

    const handleIncreaseQuantity = (foodId) => {
        setQuantities({
            ...quantities,
            [foodId]: (quantities[foodId] || 1) + 1,
        });
    };

    const handleDecreaseQuantity = (foodId) => {
        setQuantities({
            ...quantities,
            [foodId]: Math.max(1, (quantities[foodId] || 1) - 1),
        });
    };

    const handleAddToCart = async (foodId) => {
        const quantity = quantities[foodId] || 1;
        try {
            const result = await addCart({ food: foodId, quantity });
            if (result) {
                toast.success("Item added to cart!");
                navigate('/cart');
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {foods.map((menuItem) => (
                            <div key={menuItem.id} className="bg-white p-3 rounded-md shadow text-sm">
                                <img
                                    src={`http://localhost:8000/${menuItem.image}`}
                                    alt={menuItem.name}
                                    className="w-full h-24 object-cover rounded mb-2"
                                />
                                <h3 className="font-semibold text-sm mb-1">{menuItem.name}</h3>
                                <p className="text-gray-600 mb-1">{menuItem.description.substring(0, 30)}...</p>
                                <div className="mb-1">
                                    <span className="font-semibold text-yellow-500">Rating:</span> {menuItem.rating} / 5
                                </div>
                                <p><strong>Ingredients:</strong> {menuItem.ingredients}</p>
                                <p><strong>Price:</strong> ₹{menuItem.price}</p>
                                <p><strong>Cuisine:</strong> {menuItem.cuisine_type}</p>
                                <p><strong>Stock:</strong> {menuItem.stock_quantity}</p>

                                <div className="flex items-center space-x-2 mt-2">
                                    <button
                                        onClick={() => handleDecreaseQuantity(menuItem.id)}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    >-</button>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantities[menuItem.id] || 1}
                                        onChange={(e) => handleQuantityChange(menuItem.id, e.target.value)}
                                        className="w-10 text-center border rounded"
                                    />
                                    <button
                                        onClick={() => handleIncreaseQuantity(menuItem.id)}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    >+</button>
                                </div>

                                <button
                                    onClick={() => handleAddToCart(menuItem.id)}
                                    className="mt-3 w-full py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
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
