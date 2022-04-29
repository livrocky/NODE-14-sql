const express = require('express');
const { createTable, createCategory } = require('../controller/catController');

const catRoutes = express.Router();

// routes
catRoutes.post('/categories/create', createTable);

// POST /api/categories/ - atsiusti title ir sukurti nauja kategorija
catRoutes.post('/categories', createCategory);

module.exports = catRoutes;
