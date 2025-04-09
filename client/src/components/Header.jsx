import React from 'react';
import img from '../assets/img_2.jpg'

const Header = () => {
  return (
    <header className="relative w-full h-[400px] bg-cover bg-center" style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold">Welcome to Our Restaurant</h1>
        <p className="text-lg md:text-xl mt-4">Experience fine dining like never before</p>
      </div>
    </header>
  );
};

export default Header;
