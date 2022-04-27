const express = require('express');
const morgan = require('morgan');
// const cors = require('cors');
const { PORT } = require('./config');

const app = express();

// Middleware
app.use(morgan('dev'));

// home route

app.get('/', (request, response) => {
  response.json('Hello Mysql');
});

app.listen(PORT, () => console.log('express is online', PORT));
