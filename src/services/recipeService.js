const Recipe = require('../models/Recipes');

exports.createRecipe = (data) => Recipe.create(data);

exports.findAllRecipes = () => Recipe.find({}).populate('ownerId', 'name');