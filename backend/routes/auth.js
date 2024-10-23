import express from 'express';
import { registerUser, loginUser, addfav, getFavoriteRecipes, deleteFavoriteRecipe } from '../controller/authController.js';
import authMiddleware from '../middleware/authMiddleware.js'; 

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/recipe', addfav);
router.get('/getrecipe', authMiddleware, getFavoriteRecipes); // Protect this route from unauthorzed
router.delete('/deleteRecipe', authMiddleware, deleteFavoriteRecipe); // Protect this route unauthorzed

export default router;
