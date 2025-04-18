import React from 'react';
import img from '../assets/img_3.jpg';
import img1 from '../assets/img_4.jpg';
import img2 from '../assets/img_5.jpg';
import img3 from '../assets/img_6.jpg';
import img4 from '../assets/img_8.jpg';

const GallerySection = () => {
  return (
    <section className="py-16 px-4 bg-white text-center">
      <h2 className="text-3xl font-bold mb-6">Restaurant Gallery</h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <img src={img} alt="Restaurant Dish 1" className="w-full h-64 object-cover rounded-lg shadow-lg" />
        <img src={img1} alt="Restaurant Dish 2" className="w-full h-64 object-cover rounded-lg shadow-lg" />
        <img src={img2} alt="Restaurant Dish 3" className="w-full h-64 object-cover rounded-lg shadow-lg" />
        <img src={img3} alt="Restaurant Dish 4" className="w-full h-64 object-cover rounded-lg shadow-lg" />
        <img src={img4} alt="Restaurant Dish 4" className="w-full h-64 object-cover rounded-lg shadow-lg" />
      </div>
    </section>
  );
};

export default GallerySection;
