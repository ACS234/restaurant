import React from 'react';
import img from '../assets/img_3.jpg';
import img1 from '../assets/img_4.jpg';
import img2 from '../assets/img_5.jpg';
import { IoIosStarHalf } from "react-icons/io";
const ReviewsSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-6">What Our Customers Are Saying</h2>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-xs">
          <img src={img} alt="User 1" className="w-16 h-16 rounded-full mx-auto" />
          <p className="mt-4 text-lg">"The food was absolutely amazing! Highly recommend the pasta."</p>
          <p className="mt-2 text-gray-600">- Rejesh Kumar 4.6 <IoIosStarHalf/></p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-xs">
          <img src={img1} alt="User 2" className="w-16 h-16 rounded-full mx-auto" />
          <p className="mt-4 text-lg">"A fantastic dining experience, the ambiance was perfect."</p>
          <p className="mt-2 text-gray-600">- Naurangi Lal 4.6 <IoIosStarHalf/> </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-xs">
          <img src={img2} alt="User 2" className="w-16 h-16 rounded-full mx-auto" />
          <p className="mt-4 text-lg">"A fantastic dining experience, the ambiance was perfect."</p>
          <p className="mt-2 text-gray-600">- Priyesh 4.6 <IoIosStarHalf/></p>
        </div>
      </div>
    </section>
  );
};
export default ReviewsSection;
