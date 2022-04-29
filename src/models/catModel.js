// model fn
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function createTableDB() {
  console.log('createTableDB model ran');
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM posts';
    console.log('pries uzklausa');
    const [result] = await conn.query(sql);
    console.log('po uzklausos');
    return result;
  } catch (error) {
    console.log('error createTableDB', error);
    // return false
    throw error;
  } finally {
    conn?.end();
  }
}

module.exports = {
  createTableDB,
};
