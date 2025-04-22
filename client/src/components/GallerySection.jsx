import React from 'react';
import img from '../assets/img_1.jpg'
import img1 from '../assets/img_2.jpg'
import img3 from '../assets/img_3.jpg'
import img4 from '../assets/img_4.jpg'
import img6 from '../assets/img_5.jpg'
import img7 from '../assets/img_6.jpg'
import img8 from '../assets/img_8.jpg'
import img9 from '../assets/img_9.jpg'


const Gallery = () => {
  return (
    <div className="bg-gray-300 p-10">
      <div className="grid grid-cols-4 gap-4 relative">

        <div className="relative overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-105 hover:z-10">
          <img
            className="w-full h-full object-cover"
            src={img}
            alt="Restaurant Image 1"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-105 hover:z-10">
          <img
            className="w-full h-full object-cover"
            src={img1}
            alt="Restaurant Image 2"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-105 hover:z-10">
          <img
            className="w-full h-full object-cover"
            src={img3}
            alt="Restaurant Image 3"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-105 hover:z-10">
          <img
            className="w-full h-full object-cover"
            src={img4}
            alt="Restaurant Image 4"
          />
        </div>

        <div className="relative overflow-hidden rounded-lg col-span-2 -mt-16 z-0">
          <img
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            src={img9}
            alt="Restaurant Image 5"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-105 hover:z-10">
          <img
            className="w-full h-full object-cover"
            src={img7}
            alt="Restaurant Image 6"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-105 hover:z-10">
          <img
            className="w-full h-full object-cover"
            src={img3}
            alt="Restaurant Image 7"
          />
        </div>

        <div className="relative overflow-hidden rounded-lg col-span-2 -mt-16 z-0">
          <img
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            src={img6}
            alt="Restaurant Image 8"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-105 hover:z-10">
          <img
            className="w-full h-full object-cover"
            src={img3}
            alt="Restaurant Image 9"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-105 hover:z-10">
          <img
            className="w-full h-full object-cover"
            src={img9}
            alt="Restaurant Image 10"
          />
        </div>

        <div className="relative overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-105 hover:z-10">
          <img
            className="w-full h-full object-cover"
            src={img4}
            alt="Restaurant Image 11"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg col-span-2 -mt-16 z-0">
          <img
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            src={img6}
            alt="Restaurant Image 12"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-105 hover:z-10">
          <img
            className="w-full h-full object-cover"
            src={img8}
            alt="Restaurant Image 13"
          />
        </div>

        <div className="relative overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-105 hover:z-10">
          <img
            className="w-full h-full object-cover"
            src={img}
            alt="Restaurant Image 14"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg col-span-2 -mt-16 z-0">
          <img
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            src={img3}
            alt="Restaurant Image 15"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-105 hover:z-10">
          <img
            className="w-full h-full object-cover"
            src={img9}
            alt="Restaurant Image 16"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
