const Recipe = require('../models/Recipes');

exports.createRecipe = (data) => Recipe.create(data);

exports.findAllRecipes = () => Recipe.find({}).populate('ownerId', 'name');

exports.findRecipesByCategory = (categoryName) => Recipe.find({ category: categoryName }).populate('ownerId', 'name');