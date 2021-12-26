const Recipe = require('../models/Recipes');

exports.createRecipe = (data) => Recipe.create(data);

exports.findAllRecipes = () => Recipe.find({}).populate('ownerId', 'name');

exports.findRecipesByCategory = (categoryName) => Recipe.find({ category: categoryName }).populate('ownerId', 'name');

exports.findOneRecipeById = (recipeId) => Recipe.findOne({ _id: recipeId }).populate('ownerId', 'name');

exports.findRecipeAndUpdate =(recipeId, recipeData) => Recipe.findByIdAndUpdate(recipeId, recipeData);

exports.findRecipeAndDeleteIt = (recipeId) => Recipe.findByIdAndDelete(recipeId);