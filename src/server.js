const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2/promise');
// const cors = require('cors');
const { PORT, dbConfig } = require('./config');
const { postRoutes } = require('./routes/postsRoutes');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors('cors'));

// home route

app.get('/api/posts', async (req, res) => {
  let connection;
  try {
    // 1 prisijungti
    connection = await mysql.createConnection(dbConfig);
    console.log('connected');
    // 2 atlikti veiksma
    const sql = 'SELECT * FROM posts';
    const [rows, fields] = await connection.query(sql);
    res.json(rows);
  } catch (error) {
    // // err gaudom klaidas
    console.log('home route error ===', error);
    res.status(500).json('something went wrong');
  } finally {
    // 3 atsijungti
    if (connection) connection.end();
    // connection?.close();
  }
});

app.use('/api/', postRoutes);

app.listen(PORT, () => console.log('express is online', PORT));
