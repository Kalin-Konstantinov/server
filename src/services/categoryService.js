const Category = require('../models/Category');

exports.createCategory = (categoryData) => Category.create(categoryData);

exports.findAllCaetgorys = () => Category.find({});

exports.findOneCaetgory = (categoryName) => Category.find({ name: categoryName });