import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart } from "react-icons/fa6";

function Favourite({ user }) {
    const [recipeIds, setRecipeIds] = useState([]); // State to store recipe IDs
    const [recipes, setRecipes] = useState([]); // State to store fetched recipe details
    const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        const fetchFavoriteRecipes = async () => {
            setLoading(true); // Start loading
            try {
                // Fetch recipe IDs for the logged-in user
                const response = await axios.get(`http://localhost:5000/api/auth/getrecipe?userId=${user.id}`);
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

    if (loading) {
        return <p className='text-center text-lg'>Loading recipes...</p>;
    }

    return (
    <div className='px-32'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 h-screen'>
            {recipes.length > 0 ? (
                recipes.map((recipe) => (
                    <div key={recipe.idMeal} className='border h-80 mt-10 rounded-lg overflow-hidden shadow-lg cursor-pointer'>
                        <img
                            onClick={() => fetchRecipeDetails(recipe.idMeal)} // Handle click to fetch more details
                            src={recipe.strMealThumb}
                            alt={recipe.strMeal}
                            className='w-full rounded-3xl h-48 object-cover'
                        />
                        <div className='pt-2 px-4 flex space-x-3'>
                            <p>{recipe.strCategory}</p> {/* Display the category */}
                            <FaHeart style={{color:'red'}} className='mt-1 text-xl text-red-600'  onClick={() => handleFav(recipe.idMeal)} />
                        </div>
                        <div className='px-4 pb-5 pt-3'>
                            <h2
                                onClick={() => fetchRecipeDetails(recipe.idMeal)} // Handle click to fetch more details
                                className='font-bold text-md'
                            >
                                {recipe.strMeal}
                            </h2>
                        </div>
                    </div>
                ))
            ) : (
                <p className='text-center text-lg'>No recipes available.</p>
            )}
        </div>


    </div>

        
    );
}

export default Favourite;
