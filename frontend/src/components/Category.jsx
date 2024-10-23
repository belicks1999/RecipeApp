import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CiHeart } from "react-icons/ci";
import RecipeModal from './RecipeModal'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart } from "react-icons/fa6";

function Category({hanldeFav,user}) {
  const [categories, setCategories] = useState([]); 
  const [recipes, setRecipes] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const[recipeIds,setRecipeIds]=useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        setCategories(response.data.categories.slice(0, 5)); 
        
        // Set default category to the first category
        if (response.data.categories.length > 0) {
          setSelectedCategory(response.data.categories[0].strCategory);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories(); 
  }, []);


  useEffect(() => {
    const fetchrecipeIds = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://recipe-app-backend-seven.vercel.app/api/auth/getrecipe?userId=${user.id}`, {
          headers: {
            'x-auth-token': token // Include the token in the headers
          }
        });
        const ids = response.data; // Assuming this returns an array of recipe IDs
        setRecipeIds(ids);
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
      }
    };
  
    // Call the function to fetch recipe IDs
    fetchrecipeIds();
  }, [user.id]); 

  // Fetch recipes based on selected category
  useEffect(() => {
    const fetchRecipes = async () => {
      if (!selectedCategory) return; 

      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
        setRecipes(response.data.meals); 
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [selectedCategory]);

  // Function to fetch recipe details by id
  const fetchRecipeDetails = async (idMeal) => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      setSelectedRecipe(response.data.meals[0]);
      setIsModalOpen(true); 
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedRecipe(null);
    setIsModalOpen(false);
  };

  const hanldeDel = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`https://recipe-app-backend-seven.vercel.app/api/auth/deleteRecipe?userId=${user.id}&recipeId=${id}`, {
            headers: {
                'x-auth-token': token // Include the token in the headers
            }
        });

        if (response.status === 200) {
            // Handle successful deletion
            console.log('Recipe deleted successfully:', response.data);
            toast.error('Recipe Unfavourite !');
            setRecipeIds((prevRecipes) => prevRecipes.filter(recipeId => recipeId !== id));
            
        } else {
            console.log('Failed to delete recipe:', response.data.msg);
        }
    } catch (error) {
        console.error('Error while deleting the recipe:', error);
    }
};

  return (
    <div className='lg:px-32  min-h-screen'>
       <ToastContainer />
      <ul className='flex flex-wrap lg:justify-start justify-center space-x-3 lg:space-x-5 p-2 lg:p-5 lg:px-10 mb-5 '>
        {categories.map((category) => (
          <li
            className={`rounded-full border text-sm ${category.strCategory===selectedCategory?'bg-red-500 text-white':'text-red-500'} border-red-500 p-2 lg:p-4 w-28 lg:w-40 text-center hover:cursor-pointer mb-2 lg:mb-0`}
            key={category.idCategory}
            onClick={() => setSelectedCategory(category.strCategory)} // Set selected category
          >
            {category.strCategory}
          </li>
        ))}
      </ul>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 px-2'>
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className='border rounded-lg overflow-hidden shadow-lg cursor-pointer'
              
            >
              <img onClick={() => fetchRecipeDetails(recipe.idMeal)}  src={recipe.strMealThumb} alt={recipe.strMeal} className='w-full rounded-3xl h-48 object-cover' />
              <div className='pt-2 px-4 flex space-x-3'>
                <p className='mt-1'>{selectedCategory}</p>
                {recipeIds.includes(recipe.idMeal) ? (
            <FaHeart className='mt-1 text-xl text-red-500' onClick={() => { hanldeDel(recipe.idMeal) }} />
          ) : (
            <CiHeart className='mt-1 text-2xl' onClick={() => { hanldeFav(recipe.idMeal) }} />
          )}
              </div>
              <div className='px-4 pb-5 pt-3'>
                <h2 onClick={() => fetchRecipeDetails(recipe.idMeal)}  className='font-bold text-md'>{recipe.strMeal}</h2>
              </div>
            </div>
          ))
        ) : (
                <div className='col-span-full flex justify-center items-center min-h-80'>
                <p className='text-center text-lg'>No recipes available.</p>
                </div>
        )}
      </div>

      {/* Recipe Modal */}
      <RecipeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        recipe={selectedRecipe}
      />
    </div>
  );
}

export default Category;
