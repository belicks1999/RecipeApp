import express from 'express';
import { registerUser, loginUser,addfav,getFavoriteRecipes } from '../controller/authController.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/recipe',addfav );
router.get('/getrecipe',getFavoriteRecipes)

export default router;
