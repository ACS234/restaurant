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
        <div className="bg-gray-50">
            <ToastContainer/>
            <section className="py-16 px-4 text-justify">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold mb-2">Our Menu</h2>
                    <hr className="my-8 border-t-2 border-gray-300" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {foods.map((menuItem) => (
                            <div key={menuItem.id} className="bg-white p-6 rounded-lg shadow-lg">
                                <img
                                    src={`http://localhost:8000/${menuItem.image}`}
                                    alt={menuItem.title}
                                    className="w-full h-60 object-cover rounded-lg mb-4"
                                />
                                <h3 className="font-semibold text-2xl mb-2">{menuItem.name}</h3>
                                <p className="text-md text-justify text-gray-700 mb-2">{(menuItem.description).substring(0,10)}</p>
                                <div className="mb-4 text-justify">
                                    <span className="font-semibold text-yellow-500">Rating: </span>
                                    <span className="text-md text-gray-700">{menuItem.rating} / 5</span>
                                </div>
                                <div className="list-disc mt-2 text-justify text-gray-600 mb-2">
                                    <p>Ingredients:{menuItem.ingredients}</p>
                                </div>
                                <div className="space-y-2 mb-2 text-justify">
                                    <p className="text-md">
                                        <strong>Price:</strong>₹{menuItem.price}
                                    </p>
                                    <p className="text-md capitalize">
                                        <strong>Cuisine Type:</strong> {menuItem.cuisine_type}
                                    </p>
                                    <p className="text-md">
                                        <strong>Stock Quantity:</strong> {menuItem.stock_quantity}
                                    </p>
                                </div>
                                <div className="flex mt-4 space-x-4">
                                    <Link to="/order"
                                        className="inline-block px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
                                    >
                                        Add Cart
                                    </Link>
                                    <Link to="#order"
                                        className="inline-block px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
                                    >
                                        Order Now
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
