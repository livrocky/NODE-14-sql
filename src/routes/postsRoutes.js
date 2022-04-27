const express = require('express');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

// sukurti routeri
const postRoutes = express.Router();
// routeri impoprtuoti i server js
// sukurti tuscia route ir isitikinti kad veikia
postRoutes.get('/first-posts', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM posts LIMIT 2';
    const [rows] = await conn.query(sql);
    res.json(rows);
  } catch (error) {
    console.log('error getting first posts', error);
    res.status(500);
  } finally {
    await conn?.end();
  }
});
// GET /api/first-posts - parsiusti pirmus 2 posts (LIMIT)

module.exports = {
  postRoutes,
};
