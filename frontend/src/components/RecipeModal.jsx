// src/components/RecipeModal.jsx
import React from 'react';

const RecipeModal = ({ isOpen, onClose, recipe }) => {
  if (!isOpen || !recipe) return null;

  // Function to truncate text for mobile view
  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  // Determine if the screen is small (mobile view)
  const isMobile = window.innerWidth < 640;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-xs">
      <div className="bg-white p-4 sm:p-8 rounded shadow-lg w-11/12 sm:w-1/2 relative">
        <button
          className="absolute text-lg top-2 right-2 text-red-500 font-bold"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl sm:text-2xl font-bold mb-4">{recipe.strMeal}</h2>
        <p className="mt-4">
          {isMobile ? truncateText(recipe.strInstructions, 100) : recipe.strInstructions}
        </p>
        <ul className="mt-4">
          <h3 className="font-semibold">Ingredients:</h3>
          {Object.keys(recipe)
            .filter((key) => key.startsWith("strIngredient") && recipe[key])
            .map((key, index) => (
              <li key={index}>
                {recipe[key]} - {recipe[`strMeasure${key.slice(13)}`]}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeModal;
