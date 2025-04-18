import React, { useEffect, useState } from "react";
import { searchFoods } from "../services/apiServices";
import { useLocation } from "react-router-dom";

const SearchResultsPage = () => {
  const [foods, setFoods] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("query"); // Search term
  const category = queryParams.get("category");
  const is_vegetarian = queryParams.get("is_vegetarian");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await searchFoods({
          params: {
            name,
            category,
            is_vegetarian,
          },
        });
        setFoods(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (name) {
      fetchResults();
    }
  }, [name, category, is_vegetarian]);

  return (
    <div className="p-4">
        <div className="mt-20">
      <h2 className="text-xl font-semibold mb-4">Search Results for "{name}"</h2>
      {foods.length > 0 ? (
        <ul className="space-y-2">
          {foods.map((food) => (
            <li key={food.id} className="bg-white p-2 rounded shadow">
              <strong>{food.name}</strong> - {food.category} -{" "}
              {food.is_vegetarian ? "Vegetarian" : "Non-Vegetarian"}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No matching results found.</p>
      )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
