import React from 'react';
import img2 from '../assets/img_5.jpg';

const MenuDetail = () => {
  // Hardcoded menu data for a specific item (e.g., Pasta Carbonara)
  const menuItem = {
    title: 'Pasta Carbonara',
    description: 'A creamy pasta with bacon, eggs, and cheese. A classic Italian dish perfect for any pasta lover.',
    ingredients: ['Pasta', 'Bacon', 'Eggs', 'Parmesan Cheese', 'Black Pepper'],
    price: '$14.99',
    prepTime: '20 minutes',
    image: img2,
    dietaryInfo: 'Contains dairy and gluten.',
  };

  return (
    <section className="py-16 px-4 bg-gray-100 text-center">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">{menuItem.title}</h2>
        <img
          src={menuItem.image}
          alt={menuItem.title}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />
        <p className="text-lg text-gray-700 mb-4">{menuItem.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold text-2xl">Ingredients</h3>
            <ul className="list-disc ml-6 mt-2">
              {menuItem.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-600">{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold text-2xl">Details</h3>
            <p className="text-lg mt-2">
              <strong>Price:</strong> {menuItem.price}
            </p>
            <p className="text-lg mt-2">
              <strong>Preparation Time:</strong> {menuItem.prepTime}
            </p>
            <p className="text-lg mt-2">
              <strong>Dietary Information:</strong> {menuItem.dietaryInfo}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <a
            href="#order"
            className="inline-block px-8 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
          >
            Order Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default MenuDetail;
