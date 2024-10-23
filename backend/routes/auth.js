import express from 'express';
import { registerUser, loginUser,addfav,getFavoriteRecipes,deleteFavoriteRecipe } from '../controller/authController.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/recipe',addfav );
router.get('/getrecipe',getFavoriteRecipes);
router.delete('/deleteRecipe', deleteFavoriteRecipe);

export default router;
