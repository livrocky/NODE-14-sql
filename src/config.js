require('dotenv').config();

const PORT = process.env.PORT || 5000;

// db config
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
};

module.exports = {
  PORT,
  dbConfig,
};
