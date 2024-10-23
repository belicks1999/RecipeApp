// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Model/User.js';
import dotenv from 'dotenv';
import Recipe from '../Model/Recipe.js';

dotenv.config();

export const registerUser = async (req, res) => {
  const { firstname,lastname,mobile,email, password } = req.body;

  try {
   
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({ firstname,lastname,mobile,email, password });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();
    res.status(200).json({msg:'succesfull'});

    //navigator
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Password' });
    }

    // Create and sign JWT
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// controllers/authController.js
export const addfav = async (req, res) => {
    const { recipeId, userId } = req.body;
  
    if (!recipeId || !userId) {
      return res.status(400).json({ msg: 'Invalid data' });
    }
  
    try {
      // Check if the recipe already exists for this user
      const recipeExists = await Recipe.isRecipeExists(recipeId, userId);
      if (recipeExists) {
        return res.status(400).json({ msg: 'Recipe already in favorites' });
      }
  
      // Create a new Recipe entry
      const newRecipe = new Recipe({ recipeId, userId });
      await newRecipe.save();
  
      res.status(200).json({ msg: 'Recipe added to favorites' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };

  export const getFavoriteRecipes = async (req, res) => {
    
    const { userId } = req.query; // Get userId from query params

    if (!userId) {
        return res.status(400).json({ msg: 'User ID is required' });
    }

    try {
        // Find all recipes for the given user ID
        const recipes = await Recipe.find({ userId });

        if (!recipes || recipes.length === 0) {
            return res.status(404).json({ msg: 'No favorite recipes found for this user.' });
        }

        // Return only the recipe IDs
        const recipeIds = recipes.map(recipe => recipe.recipeId);
        res.json(recipeIds);
    } catch (error) {
        console.error('Error fetching favorite recipes:', error);
        res.status(500).json({ msg: 'Server error' });
    }
    };

    export const deleteFavoriteRecipe = async (req, res) => {
    
      const { userId, recipeId } = req.query; // Get userId and recipeId from query params
  
      if (!userId || !recipeId) {
          return res.status(400).json({ msg: 'User ID and Recipe ID are required' });
      }
  
      try {
          // Find and delete the recipe for the given user ID and recipe ID
          const deletedRecipe = await Recipe.findOneAndDelete({ userId, recipeId });
  
          if (!deletedRecipe) {
              return res.status(404).json({ msg: 'Favorite recipe not found for this user.' });
          }
  
          res.json({ msg: 'Favorite recipe deleted successfully.' });
      } catch (error) {
          console.error('Error deleting favorite recipe:', error);
          res.status(500).json({ msg: 'Server error' });
      }
  };
  

