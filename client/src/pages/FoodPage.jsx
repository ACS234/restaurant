import React, { useEffect, useState } from 'react';
import { getFoods, addCart, searchItems } from '../services/apiServices';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";

const FoodPage = () => {
  const [foods, setFoods] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("")
  const [filterData, setFilterData] = useState([])

  const handleSearch = (query) => {
    try {
      searchItems(query).then((res) => {
        if (res.data) {
          setFilterData(res.data)
        }
      })

    } catch (error) {
      console.error("error", error)
    }
  }
  console.log("filterdata", filterData)

  useEffect(() => {
    handleSearch(search)
  }, [search])


  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await getFoods();
        setFoods(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchFoods();
  }, []);

  const handleAddToCart = async (foodId) => {
    try {
      const result = await addCart({ food: foodId });
      if (result) {
        toast.success("Item added to cart!");
        setTimeout(() => {
          navigate('/cart');
        }, 2000);
      }
    } catch (error) {
      toast.error("Please log in first.", error);
    }
  };

  const handleShowDetails = (foodItem) => {
    setSelectedFood(foodItem);
    setShowModal(true);
  };

  return (
    <div className="relative bg-[#3e7ea6d7] min-h-screen py-24 px-4 text-white">
      <ToastContainer />
      <section className="relative z-10 max-w-7xl mx-auto text-center mb-20">
        <p className="flex items-center hover:text-indigo-400 cursor-pointer">
          <IoSearch
            size={18}
            onClick={handleSearch}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-900"
          />
          <input
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="search"
            placeholder="Search..."
            className="w-1/2 rounded-md bg-gray-200 text-red-500"
          />
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          Taste the Difference
        </h1>
        <p className="mt-2 text-lg text-gray-200 max-w-xl mx-auto">
          Discover handcrafted dishes made with love. Fast delivery. Fresh ingredients. Satisfaction guaranteed.
        </p>
        <button
          onClick={() => navigate('/menu')}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold rounded-lg shadow-lg transition-all"
        >
          Explore Menu
        </button>
      </section>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {foods && filterData.map((menuItem) => (
            <div
              key={menuItem.id}
              className="relative bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col justify-between"
            >
              <button
                onClick={() => handleShowDetails(menuItem)}
                className="absolute top-2 right-2 text-white hover:text-gray-300"
              >
                <BsThreeDots size={20} color='yellow' />
              </button>

              <img
                src={`http://localhost:8000/${menuItem.image}`}
                alt={menuItem.name}
                className="w-full h-36 sm:h-44 md:h-48 object-cover rounded-md mb-3"
              />

              <img
                src={`http://localhost:8000/${menuItem.image}`}
                alt=""
                id={`fly-img-${menuItem.id}`}
                className="w-12 h-12 object-cover fixed z-[9999] hidden rounded-full"
              />

              <h3 className="font-semibold text-md truncate">
                {menuItem.name} | {menuItem.restaurants[0]?.name}
              </h3>

              <div className="text-yellow-400 text-sm mb-1">
                {"★".repeat(Math.round(menuItem.rating || 0)).padEnd(5, "☆")}
                <span className="text-gray-300 ml-1">({menuItem.rating ?? "0.0"})</span>
              </div>

              <p className="mb-3">
                <span className="inline-block bg-green-500 px-3 py-1 rounded-full text-sm text-white font-bold shadow">
                  ₹{menuItem.price}
                </span>
              </p>

              <button
                onClick={() => handleAddToCart(menuItem.id)}
                className="flex items-center justify-center gap-2 bg-[#ffb237] text-white font-semibold py-2 rounded-md transition-all duration-300"
              >
                <FaCartArrowDown />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedFood && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4">
          <div className="bg-[#FFB337] rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-black text-xl"
            >
              ✕
            </button>
            <img
              src={`http://localhost:8000/${selectedFood.image}`}
              alt={selectedFood.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{selectedFood.name}</h2>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Restaurant:</span> {selectedFood.restaurants[0]?.name}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Description:</span> {selectedFood.description}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Ingredients:</span> {selectedFood.ingredients}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Cuisine Type:</span> {selectedFood.cuisine_type}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Price:</span> ₹{selectedFood.price}
            </p>
            <p className="text-sm text-gray-500 mb-3">
              {"★".repeat(Math.round(selectedFood.rating || 0)).padEnd(5, "☆")} ({selectedFood.rating ?? "0.0"})
            </p>
            <button
              onClick={() => {
                handleAddToCart(selectedFood.id);
                setShowModal(false);
              }}
              className="w-full py-2 mt-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodPage;
