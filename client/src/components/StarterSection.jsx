import React from 'react';

const StarterSection = () => {
  return (
    <section className="bg-white py-16 px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Starters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Example starter dishes */}
        <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
          <h3 className="font-semibold text-xl">Bruschetta</h3>
          <p className="mt-2">Crispy bread topped with tomatoes, basil, and olive oil.</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
          <h3 className="font-semibold text-xl">Calamari</h3>
          <p className="mt-2">Fried squid served with a tangy dipping sauce.</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
          <h3 className="font-semibold text-xl">Stuffed Mushrooms</h3>
          <p className="mt-2">Mushrooms filled with cheese and herbs, baked to perfection.</p>
        </div>
      </div>
    </section>
  );
};

export default StarterSection;
