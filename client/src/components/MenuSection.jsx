import React from 'react';

const MenuSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-6">Our Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Example menu items */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold text-xl">Pasta Carbonara</h3>
          <p className="mt-2">Creamy pasta with bacon, eggs, and cheese.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold text-xl">Grilled Salmon</h3>
          <p className="mt-2">Perfectly grilled salmon with lemon butter sauce.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold text-xl">Chicken Parmesan</h3>
          <p className="mt-2">Breaded chicken with marinara sauce and melted mozzarella.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold text-xl">Margherita Pizza</h3>
          <p className="mt-2">Classic pizza with fresh mozzarella, tomatoes, and basil.</p>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
