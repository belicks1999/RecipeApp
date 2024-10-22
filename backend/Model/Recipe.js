// models/recipe.js
import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
    recipeId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  
});

// Static method to check if a recipe exists
RecipeSchema.statics.isRecipeExists = async function(recipeId, userId) {
    const recipe = await this.findOne({ recipeId, userId });
    return recipe !== null; // Returns true if exists, otherwise false
};

const Recipe = mongoose.model('Recipe', RecipeSchema);
export default Recipe;
