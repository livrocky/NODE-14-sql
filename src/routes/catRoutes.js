const express = require('express');
const { createTable } = require('../controller/catController');

const catRoutes = express.Router();

// routes
catRoutes.post('/categories/create', createTable);

module.exports = catRoutes;
