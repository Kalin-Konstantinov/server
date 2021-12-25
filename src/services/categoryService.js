const Category = require('../models/Category');

exports.createCategory = (categoryData) => Category.create(categoryData);

exports.findAllCaetgorys = () => Category.find({});