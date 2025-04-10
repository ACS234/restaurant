import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainSection = () => {
  const navigate = useNavigate();

  const handleMenu = () => {
    navigate('/menu');
  };


  return (
    <section className="py-16 px-4 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-4">Discover Our Delicious Cuisine</h2>
      <p className="text-lg mb-6">Explore a variety of dishes made with the finest ingredients.</p>
      <button className="bg-red-600 cursor-pointer text-white py-2 px-6 rounded-full hover:bg-red-700" onClick={handleMenu}>Explore the Menu</button>
    </section>
  );
};

export default MainSection;
