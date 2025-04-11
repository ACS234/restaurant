import React, { useState } from 'react';
import { IoIosCart } from 'react-icons/io';

const AddToCart = () => {
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const food = {
        id: 101,
        name: 'Margherita Pizza',
        price: 12.99,
        description: 'Classic pizza with tomato sauce, mozzarella & fresh basil',
    };

    const handleAddToCart = () => {
        const cartItem = {
            id: food.id,
            name: food.name,
            price: food.price,
            quantity,
        };

        console.log('Added to cart:', cartItem);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-6">
            <div className="max-w-sm bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 transform hover:scale-[1.02]">
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">{food.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">{food.description}</p>
                </div>

                <div className="mb-4">
                    <p className="text-lg font-semibold text-green-600">
                        ${food.price.toFixed(2)}
                    </p>
                </div>

                <div className="flex items-center space-x-3 mb-5">
                    <label className="text-sm font-medium text-gray-700">Quantity:</label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    onClick={handleAddToCart}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium text-white transition duration-200 ease-in-out ${added
                            ? 'bg-gradient-to-r from-green-400 to-green-600'
                            : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
                        } shadow-md hover:shadow-lg`}
                >
                    <IoIosCart size={20} />
                    {added ? 'Added!' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default AddToCart;
