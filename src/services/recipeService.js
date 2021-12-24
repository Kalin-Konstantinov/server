const Recipe = require('../models/Recipes');

exports.createRecipe = (data) => Recipe.create(data);

exports.getAll = () => Recipe.find({});