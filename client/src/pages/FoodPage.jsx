import React, { useEffect, useState } from 'react';
import { getFoods } from '../services/apiService';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const FoodPage = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                setLoading(true);
                const data = await getFoods();
                console.log('Fetched food data:', data);
                setFoods(data);
            } catch (error) {
                toast.error('Failed to load foods.', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFoods();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <ToastContainer />
            <section className="py-8 px-2">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Our Menu</h2>
                    <hr className="mb-6 border-t border-gray-300" />
                    <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
                        {foods.map((menuItem) => (
                            <div key={menuItem.id} className="bg-white p-2 rounded-md shadow-sm text-xs">
                                <img
                                    src={`http://localhost:8000/${menuItem.image}`}
                                    alt={menuItem.title}
                                    className="w-full h-24 object-cover rounded mb-2"
                                />
                                <h3 className="font-semibold text-sm mb-1 truncate">{menuItem.name}</h3>
                                <p className="text-gray-700 mb-1 truncate">{menuItem.description.substring(0, 20)}...</p>
                                <div className="mb-1">
                                    <span className="font-semibold text-yellow-500">Rating:</span>{' '}
                                    {menuItem.rating} / 5
                                </div>
                                <p className="text-gray-600 mb-1 truncate"><strong>Ingredients:</strong> {menuItem.ingredients}</p>
                                <p><strong>Price:</strong> ₹{menuItem.price}</p>
                                <p><strong>Cuisine:</strong> {menuItem.cuisine_type}</p>
                                <p><strong>Stock:</strong> {menuItem.stock_quantity}</p>
                                <div className="flex mt-2 space-x-20">
                                    <Link
                                        to="/order"
                                        className="mt-2 px-1 py-0.5 bg-green-500 text-white rounded-sm text-[10px] hover:bg-green-700"
                                    >
                                        Add
                                    </Link>
                                    <Link
                                        to="/order"
                                        className="mt-2 px-1 py-0.5 bg-yellow-500 text-white rounded-sm text-[10px] hover:bg-yellow-600"
                                    >
                                        Order
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FoodPage;
