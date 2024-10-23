import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart } from "react-icons/fa6";
import RecipeModal from './RecipeModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Favourite({ user }) {
    const [recipeIds, setRecipeIds] = useState([]); // State to store recipe IDs
    const [recipes, setRecipes] = useState([]); // State to store fetched recipe details
    const [loading, setLoading] = useState(true); // State to track loading status
    const [selectedRecipe, setSelectedRecipe] = useState(null); // State to hold selected recipe details
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility


    useEffect(() => {
        const fetchFavoriteRecipes = async () => {
            setLoading(true); // Start loading
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`https://recipe-app-backend-seven.vercel.app/api/auth/getrecipe?userId=${user.id}`, {
                    headers: {
                        'x-auth-token': token // Include the token in the headers
                    }
                });
                const ids = response.data; // Assuming this returns an array of recipe IDs
                setRecipeIds(ids); // Set recipe IDs

                // Fetch detailed recipe data for each recipe ID
                const recipeDetails = await Promise.all(ids.map(id => fetchRecipeDetails(id)));
                
                setRecipes(recipeDetails.filter(recipe => recipe)); // Filter out any null responses
            } catch (error) {
                console.error("Error fetching favorite recipes:", error);
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchFavoriteRecipes();
    }, [user.id]);

    // Function to fetch recipe details from TheMealDB API
    const fetchRecipeDetails = async (id) => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            return response.data.meals[0]; // Assuming the response structure
        } catch (error) {
            console.error(`Error fetching details for recipe ID ${id}:`, error);
            return null; // Return null or handle error as needed
        }
    };

    const openModal = (recipe) => {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
    };


    // Function to close the modal
  const closeModal = () => {
    setSelectedRecipe(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
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
            toast.error('Recipe Deleted !');
            setRecipes((prevRecipes) => prevRecipes.filter(recipe => recipe.idMeal !== id));
            
        } else {
            console.log('Failed to delete recipe:', response.data.msg);
        }
    } catch (error) {
        console.error('Error while deleting the recipe:', error);
    }
};

    if (loading) {
        return <p className='text-center text-lg'>Loading recipes...</p>;
    }

    return (
    <div className='lg:px-32'>
         <ToastContainer />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 px-2 min-h-screen'>
            {recipes.length > 0 ? (
                recipes.map((recipe) => (
                    <div key={recipe.idMeal} className='border h-80 lg:my-2 rounded-lg overflow-hidden shadow-lg cursor-pointer'>
                        <img
                            onClick={() => openModal(recipe)} // Handle click to fetch more details
                            src={recipe.strMealThumb}
                            alt={recipe.strMeal}
                            className='w-full rounded-3xl h-48 object-cover'
                        />
                        <div className='pt-2 px-4 flex space-x-3'>
                            <p>{recipe.strCategory}</p> {/* Display the category */}
                            <FaHeart style={{color:'red'}} className='mt-1 text-lg text-red-600'  onClick={() => handleDelete(recipe.idMeal)} />
                        </div>
                        <div className='px-4 pb-5 pt-3'>
                            <h2
                               onClick={() => openModal(recipe)} // Handle click to fetch more details
                                className='font-bold text-md'
                            >
                                {recipe.strMeal}
                            </h2>
                        </div>
                    </div>
                ))
            ) : (
                <div className='col-span-full flex justify-center items-center min-h-80'>
                <p className='text-center text-lg'>No Favourite recipes available.</p>
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

export default Favourite;
