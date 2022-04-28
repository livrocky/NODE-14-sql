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

/// COPIED (dinamimnis)///////////////////////////////

postRoutes.get('/posts/name/:name', async (req, res) => {
  let conn;
  try {
    const { name } = req.params;
    console.log('name===', name);
    conn = await mysql.createConnection(dbConfig);
    // const sql = `SELECT * FROM posts WHERE author = '${name}'`;
    // const [rows] = await conn.query(sql);

    // reikia neautralizuoti vartotojo ivesties duomenis
    const sql = 'SELECT * FROM posts WHERE author = ?';
    const [rows] = await conn.execute(sql, [name]);
    res.json(rows);
  } catch (error) {
    console.log('error in getting posts by James', error);
    res.status(500);
  } finally {
    await conn?.end();
  }
});

// POST /api/posts - sukurti nauja posta su duomeninis kurios gavo is post route
postRoutes.post('/posts', async (req, res) => {
  let conn;
  try {
    const newPostObj = req.body;
    console.log('newPostObj===', newPostObj);
    // const title = newPostObj.title;
    // const author = newPostObj.author;
    // const body = newPostObj.body;
    // eslint-disable-next-line object-curly-newline
    const { title, author, body, rating } = newPostObj;
    conn = await mysql.createConnection(dbConfig);
    const sql = `
  INSERT INTO posts (title, author, body, rating)
VALUES (?, ?, ?, ?)
  `;
    const [insertResultObj] = await conn.execute(sql, [title, author, body, rating]);
    if (insertResultObj.affectedRows === 1) {
      res.status(201).json(insertResultObj);
      return;
    }
    throw new Error('affected row not 1');
  } catch (error) {
    console.log('error getting first posts', error);
    res.status(500);
  } finally {
    await conn?.end();
  }
});

module.exports = {
  postRoutes,
};
