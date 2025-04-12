// import React, { useEffect, useState } from 'react';
// import { getMenuDetail } from '../services/apiService';
// import { toast } from 'react-toastify';
// import { useParams } from 'react-router-dom';
// import { IoIosStarHalf } from "react-icons/io";
// import axios from 'axios';

// const MenuDetail = () => {
//   const { id } = useParams();
//   const [menuItem, setMenuDetail] = useState([]);
//   const [foodItem, setFoodDetail] = useState([]);

//   useEffect(() => {
//     const getDetail = async (id) => {
//       try {
//         const data = await getMenuDetail(id);
//         setMenuDetail(data);
//         setFoodDetail(data.foods);
//       } catch (error) {
//         toast.error("Something went wrong", error);
//       }
//     };
//     if (id) getDetail(id);
//   }, [id]);

//   const handleAddToCart = async (foodId) => {
//     try {
//       const response = await axios.post(
//         'http://localhost:8000/api/cart/add/',
//         { food: foodId, quantity: 1 },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       toast.success("Item added to cart!");
//     } catch (error) {
//       toast.error("Failed to add item to cart.");
//     }
//   };

//   return (
//     <section className="py-16 px-4 bg-gray-100 text-center">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl text-justify font-bold mb-6">{menuItem.name}</h2>
//         <img
//           src={`http://localhost:8000/${menuItem.image}`}
//           alt={menuItem.title}
//           className="w-full h-100 object-cover rounded-lg mb-6 -z-10"
//         />
//         <p className="text-xl text-justify font-semibold text-gray-900 mb-4">{menuItem.description}</p>
//         <hr className="w-full mx-auto my-2 border-t-2 border-green-500-500" />
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8 m-2.5">
//           {foodItem.map((item) => (
//             <div key={item.id} className="bg-white w-full p-4 rounded-lg shadow-lg">
//               <img
//                 src={`http://localhost:8000/${item.image}`}
//                 alt={menuItem.title}
//                 className="w-full h-40 object-cover rounded-lg mb-6"
//               />
//               <p className="text-sm text-justify mt-0">
//                 <strong>Name:</strong> {(item.name).substring(0, 30)}...
//               </p>
//               <p className="text-sm text-justify mt-0">
//                 <strong>Cuisine Type:</strong> {item.cuisine_type}
//               </p>
//               <p className="text-sm text-justify mt-0">
//                 <strong>Category:</strong> {item.category}
//               </p>
//               <p className="text-sm text-justify mt-0">
//                 <strong>Type:</strong>{' '}
//                 <span
//                   className={`inline-block w-3 h-3 rounded-full mr-1 ${item.is_vegetarian ? 'bg-green-500' : 'bg-red-500'}`}
//                 ></span>
//                 {item.is_vegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
//               </p>
//               <p className="flex items-center text-sm mt-1 space-x-1">
//                 <strong>Rating:</strong>
//                 <span>{item.rating}</span>
//                 <IoIosStarHalf className="text-green-500" />
//               </p>
//               <div className="flex mt-6 space-x-20">
//                 <button
//                   onClick={() => handleAddToCart(item.id)}
//                   className="inline-block px-2 py-2 bg-green-500 text-white font-light rounded-lg hover:bg-green-600"
//                 >
//                   Add Cart
//                 </button>
//                 <button
//                   className="inline-block px-2 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
//                 >
//                   Order Now
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MenuDetail;

import React, { useEffect, useState } from 'react';
import { getMenuDetail } from '../services/apiService';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { IoIosStarHalf } from "react-icons/io";
import { addCart } from '../services/apiService';

const MenuDetail = () => {
  const { id } = useParams();
  const [menuItem, setMenuDetail] = useState([]);
  const [foodItem, setFoodDetail] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const getDetail = async (id) => {
      try {
        const data = await getMenuDetail(id);
        setMenuDetail(data);
        setFoodDetail(data.foods);
      } catch (error) {
        toast.error("Something went wrong",error);
      }
    };
    if (id) getDetail(id);
  }, [id]);

  const handleQuantityChange = (foodId, value) => {
    setQuantities({
      ...quantities,
      [foodId]: Math.max(1, parseInt(value) || 1)
    });
  };

  const handleAddToCart = async (foodId) => {
    const quantity = quantities[foodId] || 1;
    const data = {
      food: foodId,
      quantity,
    };
    const result = await addCart(data);
    if (result) {
      toast.success("Item added to cart!");
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-100 text-center">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl text-justify font-bold mb-6">{menuItem.name}</h2>
        <img
          src={`http://localhost:8000/${menuItem.image}`}
          alt={menuItem.title}
          className="w-full h-100 object-cover rounded-lg mb-6 -z-10"
        />
        <p className="text-xl text-justify font-semibold text-gray-900 mb-4">{menuItem.description}</p>
        <hr className="w-full mx-auto my-2 border-t-2 border-green-500" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8 m-2.5">
          {foodItem.map((item) => (
            <div key={item.id} className="bg-white w-full p-4 rounded-lg shadow-lg">
              <img
                src={`http://localhost:8000/${item.image}`}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-6"
              />
              <p className="text-sm text-justify"><strong>Name:</strong> {(item.name).substring(0, 30)}...</p>
              <p className="text-sm text-justify"><strong>Cuisine Type:</strong> {item.cuisine_type}</p>
              <p className="text-sm text-justify"><strong>Category:</strong> {item.category}</p>
              <p className="text-sm text-justify">
                <strong>Type:</strong>{' '}
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-1 ${item.is_vegetarian ? 'bg-green-500' : 'bg-red-500'}`}
                ></span>
                {item.is_vegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
              </p>
              <p className="flex items-center text-sm mt-1 space-x-1">
                <strong>Rating:</strong>
                <span>{item.rating}</span>
                <IoIosStarHalf className="text-green-500" />
              </p>

              <div className="flex items-center justify-between mt-4">
                <label className="text-sm font-medium text-gray-700">Qty:</label>
                <input
                  type="number"
                  min="1"
                  value={quantities[item.id] || 1}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex mt-6 space-x-20">
                <button
                  onClick={() => handleAddToCart(item.id)}
                  className="inline-block px-2 py-2 bg-green-500 text-white font-light rounded-lg hover:bg-green-600"
                >
                  Add Cart
                </button>
                <button
                  className="inline-block px-2 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuDetail;
